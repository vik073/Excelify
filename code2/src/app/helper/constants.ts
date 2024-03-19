// constants.ts

import { environment } from "environments/environment";


export namespace Constants {
    export const GetAllProgram = environment.apiUrl + '/Program/GetAllProgram';
    export const GetProgramDetails = environment.apiUrl + '/Program/GetProgramDetails';
    export const CreateUpdateProgram = environment.apiUrl + '/Program/CreateUpdateProgram';
    export const GetProgramManagers = environment.apiUrl + '/Program/GetProgramManagers';

    export const GetAllCorporateCoaches = environment.apiUrl + '/Program/getAllCorporateCoaches';
    export const GetAllCorporateUsers = environment.apiUrl + '/Program/getAllCorporateUsers';
    export const GetCompetencies = environment.apiUrl + '/Program/getCompetencies';
    export const CreateEngagement = environment.apiUrl + '/Program/CreateEngagement';
    export const GetProgramSessions = environment.apiUrl + '/Program/getProgramSessions';
    export const GetProgramCoaches = environment.apiUrl + '/Program/getProgramCoachList';
    export const GetProgramCoachees = environment.apiUrl + '/Program/getProgramCoacheeList';
    export const UpdateSessionDetails = environment.apiUrl + '/Program/updateSessionDetails';
    export const RemoveOneonOneEngagement = environment.apiUrl + '/Program/RemoveOneonOneEngagement';
    export const RemoveGroupEngagement = environment.apiUrl + '/Program/RemoveGroupEngagement';
    export const AddProgramUsers = environment.apiUrl + '/Program/AddProgramUsers';
    export const Addcoaches = environment.apiUrl + '/Program/addcoaches';

    export const GetCorpUserDetails = environment.apiUrl + '/Corporate/GetCorpUserDetails';
    export const GetActiveProgramNames = environment.apiUrl + '/Program/GetActiveProgramNames';
    export const UploadCorpMembers = environment.apiUrl + '/Corporate/UploadCorpMembers';

    export const UserLogin = environment.apiUrl + '/UserLogin';    
    export const GetProgramInsight = environment.apiUrl + '/Program/GetProgramInsights';    
    
}