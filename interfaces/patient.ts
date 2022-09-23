import { ISubmission } from "./submission";

export interface IPatient {
    _id: string;
    gender: 'Female' | 'Male' | 'Other';
    height: string;
    weight: string;
    birth: string;
    diseases: string;
    previous_treatments: string    
}

