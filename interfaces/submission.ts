export interface ISubmission {
    _id: string;
    title: string;
    description: string;
    email: string;
    phone: string;
    symptoms: string;
    status: 'pending'|'inprogress'|'completed'

    createdAt: string;
    updatedAt: string;
}

