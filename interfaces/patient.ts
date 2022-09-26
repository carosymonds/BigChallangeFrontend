import { ISubmission } from "./submission";

export interface IPatient {
    _id: string;
    gender: 'female' | 'male' | 'other';
    height: string;
    weight: string;
    birth: string;
    diseases: string;
    previous_treatments: string,
    email: string,  
}
