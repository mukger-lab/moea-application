import {Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {DocumentService} from "./document.service";
import { Document } from "./document.entity";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {User} from "../auth/entities/user/user.entity";

@UseGuards(JwtAuthGuard) 
@Controller("document")
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Get('/')
    @HttpCode(HttpStatus.OK)
    getAllUserDocuments(
        @GetUser() user: User
    ): Promise<Document[]> {
        return this.documentService.getAllUserDocuments(user.id)
    }

    @Get('/:documentId')
    @HttpCode(HttpStatus.OK)
    getDocumentById(
        @GetUser() user: User,
        @Param('documentId', new ParseUUIDPipe()) documentId: string
    ): Promise<Document> {
        return this.documentService.getDocumentById(documentId, user.id);
    }
}
