import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './entities/user/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialsDto } from './dto/signup-credentials-dto';
import { SignInCredentialsDto } from './dto/signin-credentials-dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { UsersRoles } from 'src/data/users-roles';
import { User } from './entities/user/user.entity';
import { ChangeProfileInfoDto } from './dto/change-profile-info.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { SafeProfileInfo } from './interfaces/safe-profile-info.interface';
import { Response } from 'express';
import { RefreshSessionsRepository } from './entities/refresh-session/refresh-session.repository';
import { ConfigService } from '@nestjs/config';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        @InjectRepository(RefreshSessionsRepository)
        private readonly refreshSessionsRepository: RefreshSessionsRepository,
        private configService: ConfigService,
        private jwtService: JwtService
    ) {}

    async register(
        signUpCredentialsDto: SignUpCredentialsDto,
        res: Response
    ): Promise<{accessToken: string, refreshToken: string}> {
        try {
            const user = await this.usersRepository.createUser(signUpCredentialsDto)
            const { login } = signUpCredentialsDto
            const tokens = await this.formTokens(login, UsersRoles.USER)
            res.cookie("mesAccessToken", tokens.accessToken, { httpOnly: true })
            res.cookie("mesRefreshToken", tokens.refreshToken, { httpOnly: true })
            await this.refreshSessionsRepository.createRefreshSession(
                tokens.refreshToken,
                user,
                this.configService.get('TOKEN_EXPIRATION_REFRESH')
            )
            return tokens
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async login(
        signInCredentialsDto: SignInCredentialsDto,
        res: Response
    ): Promise<{accessToken: string, refreshToken: string}> {
        const { loginOrEmail, password } = signInCredentialsDto
        const user = await this.usersRepository.findUserByEmailOrLogin(loginOrEmail)

        const successfulAuthorization = user && (await bcrypt.compare(password, user.password));

        if (!successfulAuthorization) {
            throw new UnauthorizedException('Please check your inputed credentials')
        }

        try {
            const tokens = await this.formTokens(user.login, UsersRoles.USER)

            res.cookie("mesAccessToken", tokens.accessToken, { httpOnly: true })
            res.cookie("mesRefreshToken", tokens.refreshToken, { httpOnly: true })

            await this.refreshSessionsRepository.createRefreshSession(
                tokens.refreshToken,
                user,
                this.configService.get('TOKEN_EXPIRATION_REFRESH')
            )

            return tokens
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async logout(
        user: User,
        res: Response
    ): Promise<void> {
        res.cookie("mesAccessToken", "")
        res.cookie("mesRefreshToken", "")
        await this.refreshSessionsRepository.deleteOldRefreshSession(user)
        return
    }

    async getProfileInfo(user: User): Promise<User> {
        const { login } = user
        const found = await this.usersRepository.findOneBy({login})

        if (!found) {
            throw new NotFoundException()
        }

        return found;
    }

    async changeProfileInfo(
        changeProfileInfoDto: ChangeProfileInfoDto,
        user: User,
        res: Response
    ): Promise<SafeProfileInfo> {
        const { login } = user
        let found = await this.usersRepository.findOneBy({login})

        if (!found) {
            throw new NotFoundException()
        }

        try {
            Object.assign(found, await this.usersRepository.changeUserByLogin(login, changeProfileInfoDto))
        } catch (error) {
            throw new InternalServerErrorException("Ooops... Something went wrong...", error)
        }

        const result: SafeProfileInfo = {
            login: found.login,
            email: found.email,
            role: found.role
        }

        if (login) {
            const tokens = await this.formTokens(login, found.role)

            result.access_token = tokens.accessToken
            result.refresh_token = tokens.refreshToken

            res.cookie("mesAccessToken", tokens.accessToken, { httpOnly: true })
            res.cookie("mesRefreshToken", tokens.refreshToken, { httpOnly: true })
        }

        return result
    }

    async deleteProfile(
        user: User,
        res: Response
    ): Promise<void> {
        res.cookie("mesAccessToken", "")
        res.cookie("mesRefreshToken", "")

        await this.refreshSessionsRepository.delete({id: Not(IsNull()), user: {id: user.id}});
        await this.usersRepository.remove(user);

        return;
    } 

    async refreshToken(
        user: User,
        res: Response
    ): Promise<{accessToken: string, refreshToken: string}> {
        try {
            await this.refreshSessionsRepository.deleteOldRefreshSession(user)

            const tokens = await this.formTokens(user.login, UsersRoles.USER);

            res.cookie("mesAccessToken", tokens.accessToken, { httpOnly: true })
            res.cookie("mesRefreshToken", tokens.refreshToken, { httpOnly: true })

            await this.refreshSessionsRepository.createRefreshSession(
                tokens.refreshToken,
                user,
                this.configService.get('TOKEN_EXPIRATION_REFRESH')
            )

            return tokens;
        } catch (error) {
            throw new InternalServerErrorException("Ooops... Something went wrong...", error)
        }
    }

    private async formTokens(login: string, role: UsersRoles): Promise<{accessToken: string, refreshToken: string}> {
        const accessToken = await this.jwtService.signAsync({login, role, type: 'access'});
        const refreshToken = await this.jwtService.signAsync(
            {login, role, type: 'refresh'},
            {expiresIn: this.configService.get('TOKEN_EXPIRATION_REFRESH')}
        );

        return { accessToken, refreshToken }
    }
}

