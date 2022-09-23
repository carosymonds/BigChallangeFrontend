import axios from "../services/base.services";
import { SubmissionListResponse } from "../interfaces/submission-list";

export const GetSubmissions = async( ) => {
  
    try {
        const {data} = await axios.get('/submission?state=pending&role=patient');
        const submissions = data as SubmissionListResponse;
        const table: any[] = [];
        const slice: number = 34;
        submissions.data.forEach((element) =>{
            let title = element.symptoms;
            if(element.symptoms.length > slice){
                title = `${element.symptoms.slice(0, slice)}...`
            }
            table.push({
                patient_name: element.patient.name,
                state: element.state,
                title: title,
                id: element.id
            })
        })

        return table;
        
    } catch (error) {
        console.error(error);
    }
}
export const GetSubmissionById = async( id: string ) => {
    try {
        const {data} = await axios.get(`/submission/${id}`);
        const submission = data.data;
        return {
            title: submission.symptoms.slice(0, 30),
            state: submission.state,
            patient_email: submission.patient.email,
            patient_name: submission.patient.name,
            symptoms: submission.symptoms,
            patient_birth: submission.patient.patientInformation.birth,
            prescriptions: submission.prescriptions,
            patient_diseases: submission.patient.patientInformation.diseases,
            patient_previous_treatments: submission.patient.patientInformation.previous_treatments
        }
    } catch (error) {
        return {};
    }
}