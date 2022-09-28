import axios from "../services/base.services";
import { SubmissionListResponse } from "../interfaces/submission-list";
import { ISubmission } from "../interfaces/submission";

export const GetSubmissions = (role :string, isPendingSelected?: boolean ) => {
  
    try {
        if(role == 'doctor') {
            if(isPendingSelected){
                return GetAllPendingSubmissionsAsDoctor();
            }
            return GetAllSubmissionsAsDoctor();
        }
        if(role == 'patient'){
            if(isPendingSelected){
                return GetPendingSubmissionsAsPatient();
            }
            return GetAllSubmissionsAsPatient();
        }        
    } catch (error) {
        console.error(error);
    }
}

const formatSubmissionsResponse = (submissions: SubmissionListResponse) => {
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
}

export const GetAllSubmissionsAsDoctor = async() => {
  
    try {
        const {data} = await axios.get('/submission?role=doctor&all=yes');
        const submissions = data as SubmissionListResponse;
        return formatSubmissionsResponse(submissions);
    } catch (error) {
        console.error(error);
    }
}

export const GetAllPendingSubmissionsAsDoctor = async() => {
  
    try {
        const {data} = await axios.get('/submission?state=pending&role=doctor');
        const submissions = data as SubmissionListResponse;
        return formatSubmissionsResponse(submissions);
        
    } catch (error) {
        console.error(error);
    }
}

export const GetAllSubmissionsAsPatient = async() => {
  
    try {
        const {data} = await axios.get('/submission?role=patient');
        const submissions = data as SubmissionListResponse;
        return formatSubmissionsResponse(submissions);
        
    } catch (error) {
        console.error(error);
    }
}

export const GetPendingSubmissionsAsPatient = async() => {
  
    try {
        const {data} = await axios.get('/submission?state=pending&role=patient');
        const submissions = data as SubmissionListResponse;
        return formatSubmissionsResponse(submissions);
        
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

export const TakeSubmission = async( id: string ) => {
    try {
        const {data} = await axios.post(`/submission/${id}/take`);
        return data.message;
    } catch (error: any) {
        console.log(error);
        return {
            hasError: true,
            message: error.response.data.message
        }
    }
}

export const CreateSubmission = async( submissionData: ISubmission ) => {
    try {
        const {data} = await axios.post('/createSubmission', submissionData);
        return data.message;
    } catch (error: any) {
        console.log(error);
        return {
            hasError: true,
            message: error.response.data.message
        }
    }
}

export const UpdateSymptoms = async( id: string, submissionData: ISubmission ) => {
    try {
        const {data} = await axios.put(`/submission/${id}/patient`, submissionData);
        return data.message;
    } catch (error: any) {
        console.log(error);
        return {
            hasError: true,
            message: error.response.data.message
        }
    }
}