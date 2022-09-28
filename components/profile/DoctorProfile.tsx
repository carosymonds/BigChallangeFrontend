import { ArrowLongLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context';
import { IDoctor } from '../../interfaces/doctor';
import { GetDoctorInformation, UpdateDoctorInformation } from '../../services/profile.services';
import { DoctorsLayout } from '../layouts'
import { ErrorComponent } from '../ui/ErrorComponent';
import { SuccessComponent } from '../ui/SuccessComponent';

export const DoctorProfile = () => {

    const { isLoggedIn, user } = useContext(AuthContext);
    const fetchData = async () => {
        try {
            if(user){
                const data = await GetDoctorInformation(user.id);
                setValue('grade', data?.grade);
                setValue('speciality', data?.speciality);
                return data;
            }
        } catch (error: any) {
            console.log(error)
        }
    };

    const [formError, setFormError] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const updateProfile = async(data: IDoctor) => {
        try{            
            setFormError(false)
            const response = await UpdateDoctorInformation(data);
            if(response.hasError){
                setFormError(true)
                setErrorMessage(response?.message as string)
            }else{
                setSuccessMessage(response)
                setTimeout(() => setSuccessMessage(''), 5000)
            }

        }catch(error){
            setFormError(true)
            console.log(error)
        }
    }


    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IDoctor>();

    const { isLoading, isError, data, error } = useQuery(
        "profile",
        fetchData
      );
    return (
        <DoctorsLayout title="Profile" pageDescription="Profile">
            <form className="bg-white p-8" onSubmit={handleSubmit(updateProfile)} noValidate>
                <div className='w-full pb-3'>
                    <Link href="/">
                        <a>
                            <ArrowLongLeftIcon className="w-8 h-6 transition duration-75" />
                        </a>
                    </Link>
                </div>
                <div className='border-b-2 border-gray-200 pb-3 flex justify-between'>
                    <div>
                        <div className='flex'>
                            <h1 className="text-gray-900 font-medium text-xl leading-8 my-1">{user?.name}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex pt-3 items-center space-x-2 text-gray-900 leading-8 text-normal">
                    <div className="grid grid-cols-1 text-sm w-full">
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Email</h2>
                                <span>{data?.email}</span>
                            </div>
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Grade</h2>
                                <input 
                                    type="number" 
                                    placeholder="Grade"
                                    {...register("grade", { 
                                        required: "Grade is required"
                                    })}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    {errors.grade && 
                                    <div className='flex pt-2 pl-2 text-red-700'>
                                        <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                        <p className="px-2">{errors.grade?.message}</p>
                                    </div>}
                            </div>
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Speciality</h2>
                                <input 
                                    type="text" 
                                    placeholder="Speciality"
                                    {...register("speciality", { 
                                        required: "Speciality is required"
                                    })}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                {errors.speciality && 
                                <div className='flex pt-2 pl-2 text-red-700'>
                                    <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                    <p className="px-2">{errors.speciality?.message}</p>
                                </div>}
                            </div>
                        </div>
                        {formError && (
                            <ErrorComponent primaryMessage={errorMessage} />
                        )}
                        {successMessage && (<SuccessComponent primaryMessage={successMessage} />)}
                        <div className='text-right px-4 py-2'>
                            <button className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded">
                                Update
                            </button>                
                        </div>
                    </div>
                </div>
            </form>
        </DoctorsLayout>
    )
}
