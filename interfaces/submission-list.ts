export interface SubmissionListResponse {
    data: Datum[];
}

export interface Datum {
    id:            number;
    symptoms:      string;
    state:         string;
    prescriptions: null;
    doctor:        Doctor;
    patient:       Doctor;
}

export interface Doctor {
    id:                  number;
    name:                string;
    email:               string;
    role:                string;
    doctorInformation?:  DoctorInformation;
    patientInformation?: PatientInformation;
}

export interface DoctorInformation {
    id:         number;
    grade:      number;
    speciality: string;
}

export interface PatientInformation {
    id:                  number;
    gender:              string;
    height:              number;
    weight:              number;
    birth:               Date;
    diseases:            string;
    previous_treatments: string;
}
