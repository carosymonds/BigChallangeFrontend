import { IPatient } from "../interfaces/patient";
import axios from "../services/base.services";

export const GetDoctorInformation = async( userId: string) => {
    try {
        const {data} = await axios.get(`/getPatientInformation/${userId}`);
        const profile = data.data;
        return {
            diseases: profile.diseases,
            gender: profile.gender,
            birth: profile.birth,
            height: profile.height,
            previous_treatments: profile.previous_treatments,
            weight: profile.weight
        };
        
    } catch (error) {
        console.error(error);
    }
}

export const GetPatientInformation = async( userId: string) => {
    try {
        const {data} = await axios.get(`/getPatientInformation/${userId}`);
        const profile = data.data;
        return {
            diseases: profile.diseases,
            gender: profile.gender,
            birth: profile.birth,
            height: profile.height,
            previous_treatments: profile.previous_treatments,
            weight: profile.weight,
            email: data.email
        };
        
    } catch (error) {
        console.error(error);
    }
}

export const UpdatePatientInformation = async( patientData: IPatient) => {
    try {
        const {data} = await axios.post('/updatePatientInformation', patientData);
        return data.message;        
    } catch (error: any) {
        console.log(error);
        debugger
        return {
            hasError: true,
            message: error.response.data.message
        }
    }
}