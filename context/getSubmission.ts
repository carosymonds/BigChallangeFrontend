import submissionsManagerApi from "../api/submissionsManagerApi";
import { ISubmission } from "../interfaces/submission";
import { SubmissionListResponse } from "../interfaces/submission-list";

export const getSubmission = async( nameOrId: string ) => {
  
    try {
        const {data} = await submissionsManagerApi.get(`/submission/${nameOrId}`);
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