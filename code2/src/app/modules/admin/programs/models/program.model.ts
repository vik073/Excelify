export interface Program {
    programId: number;
    managerName: string;
    title: string;
    bgImage: string;
    startDate: string;
    endDate: string;
    description: string;
    shortDesc: string;
    status: string;
    rating: number;
    coacheeCount: number;
    sessionCount: number;
    engagementCount: number;
}

export interface ProgramBase {

    label: string;
    value: string;
}