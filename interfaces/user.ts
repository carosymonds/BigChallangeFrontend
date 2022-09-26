
export interface IUser {
    id      : string;
    name     : string;
    email    : string;
    password?: string;
    role     : string;

    createdAt?: string;
    updatedAt?: string;
}

export interface FormData {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    role: 'doctor' | 'patient';
    gender: 'female' | 'male' | 'other';
    weight: number;
    height: number;
    diseases: string;
    speciality: string;
    grade: number;
};