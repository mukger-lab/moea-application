interface CompetenceProfileData {
    competence: {
        code: string;
        name: string;
        calculatedLevel: number;
    };
    evidence: Array<{
        disciplineName: string;
        score: number;
    }>;
}

export {
    CompetenceProfileData,
}
