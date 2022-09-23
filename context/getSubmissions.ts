import submissionsManagerApi from "../api/submissionsManagerApi";
import { ISubmission } from "../interfaces/submission";
import { SubmissionListResponse } from "../interfaces/submission-list";

export const getSubmissions = async( nameOrId: string ) => {
  
    try {
        const {data} = await submissionsManagerApi.get('/submission?state=pending&role=patient');
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
        return [];
    }



}