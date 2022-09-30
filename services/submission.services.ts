import axios from "../services/base.services";
import { SubmissionListResponse } from "../interfaces/submission-list";
import { ISubmission } from "../interfaces/submission";
import Cookies from "js-cookie";

export const GetSubmissions = (role :string, isPendingSelected?: boolean, showHistory?: boolean ) => {
    const cookie = Cookies.get('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
    try {
        if(role == 'doctor') {
            if(isPendingSelected){
                return GetAllPendingSubmissionsAsDoctor(showHistory);
            }
            return GetAllSubmissionsAsDoctor(showHistory);
        }
        if(role == 'patient'){
            if(isPendingSelected){
                return GetPendingSubmissionsAsPatient();
            }
            return GetAllSubmissionsAsPatient(showHistory);
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

export const GetAllSubmissionsAsDoctor = async(showHistory?: boolean) => {
    const config = { 
        params: {
           role: 'doctor'
        } 
    }
    try {
        const {data} = await axios.get('/submission', config);
        const submissions = data as SubmissionListResponse;
        if(showHistory){
            submissions.data = submissions.data.filter((submission) => submission.state == 'ready');
        }
        return formatSubmissionsResponse(submissions);
    } catch (error) {
        console.error(error);
    }
}

export const GetAllPendingSubmissionsAsDoctor = async(showHistory?: boolean) => {
    const config = { 
        params: {
           role: 'doctor',
           all: 'yes'
        } 
    }
    try {
        const {data} = await axios.get('/submission', config);
        const submissions = data as SubmissionListResponse;
        if(showHistory){
            submissions.data = submissions.data.filter((submission) => submission.state == 'ready');
        }
        return formatSubmissionsResponse(submissions);
        
    } catch (error) {
        console.error(error);
    }
}

export const GetAllSubmissionsAsPatient = async(showHistory?: boolean) => {
    const config = { 
        params: {
           role: 'patient'
        } 
      }
    try {
        const {data} = await axios.get('/submission', config);
        const submissions = data as SubmissionListResponse;
        if(showHistory){
            submissions.data = submissions.data.filter((submission) => submission.state == 'ready');
        }
        return formatSubmissionsResponse(submissions);
        
    } catch (error) {
        console.error(error);
    }
}

export const GetPendingSubmissionsAsPatient = async() => {
    const config = { 
        params: {
           role: 'patient',
           state: 'pending'
        } 
      }
    try {
        const {data} = await axios.get('/submission', config);
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
            doctor_name: submission?.doctor?.name,
            doctor_speciality: submission?.doctor?.doctorInformation?.speciality,
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

export const UploadPrescription = async( id: string, file: File ) => {
    try {
        const datas = new FormData()
        datas.append('prescriptions', file)
        const {data} = await axios.post(`/submission/${id}/prescription`, datas);
        return data.message;
    } catch (error: any) {
        console.log(error);
        return {
            hasError: true,
            message: error.response.data.message
        }
    }
}

export const DeleteSubmission = async( id: string ) => {
    try {
        const {data} = await axios.delete(`/submission/${id}`);
        return data.message;
    } catch (error: any) {
        console.log(error);
        return {
            hasError: true,
            message: error.response.data.message
        }
    }
}

export const DeletePrescription = async( id: string ) => {
    try {
        const {data} = await axios.delete(`/submission/${id}/prescription`);
        return data.message;
    } catch (error: any) {
        console.log(error);
        return {
            hasError: true,
            message: error.response.data.message
        }
    }
}