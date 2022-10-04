import { IUser } from "../interfaces/user";

export enum SubmissionTable {
    SUBMISSION_TITLE = "Submission title",
    PATIENT_NAME = "Patient name",
    DOCTOR_NAME = "Doctor name",
    STATUS = "Status",
    VIEW = ""
}

export enum Roles {
    Patient = "patient",
    Doctor = "doctor",
}

export enum States {
    Pending = "pending",
    Inprogress = "inProgress",
    Ready = "ready",
}


export const isPatient = (user?: IUser) => user?.role === Roles.Patient 