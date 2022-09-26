import { ArrowLongLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { AuthContext } from '../../context'
import { IPatient } from '../../interfaces/patient'
import { GetPatientInformation, UpdatePatientInformation } from '../../services/profile.services'
import { PatientLayout } from '../layouts'
import { ErrorComponent } from '../ui/ErrorComponent'
import { SuccessComponent } from '../ui/SuccessComponent'


export const PatientProfile = () => {

    const handleDate = (date: Date) => {
        setValue('birth', formatDate(date))
        setStartDate(date)
    }
    const { isLoggedIn, user } = useContext(AuthContext);
    const fetchData = async () => {
        try {
            if(user){
                const data = await GetPatientInformation(user.id);
                var date = new Date(data?.birth);
                handleDate(date)
                setGender(data?.gender);
                setValue('email', data?.email);
                setValue('gender', data?.gender);
                setValue('height', data?.height)
                setValue('weight', data?.weight)
                setValue('diseases', data?.diseases)
                setValue('previous_treatments', data?.previous_treatments)
                setValue('birth', formatDate(date))
                return data;
            }
        } catch (error: any) {
            setFormError(true)
            setTimeout(() => setFormError(false), 3000)
            console.log(error)
        }
    };

    const [formError, setFormError] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const updateProfile = async(data: IPatient) => {
        try{            
            setFormError(false)
            const response = await UpdatePatientInformation(data);
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

    const onGenderChange = (e: any) => {
        setValue('gender', e.currentTarget.value);
        setGender(e.currentTarget.value);
    };

    const formatDate = (date: Date) => {
        // Get year, month, and day part from the date
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;
        return formattedDate;
    }
 
    const { isLoading, isError, data, error } = useQuery(
        "profile",
        fetchData
    );
    const [startDate, setStartDate] = useState(new Date());
    const [gender, setGender] = useState("");

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IPatient>();


    return (
        <PatientLayout title="Profile" pageDescription="Profile">
            <form className="bg-white p-8" onSubmit={handleSubmit(updateProfile)} noValidate >
                <div className='w-full pb-3'>
                    <ArrowLongLeftIcon className="w-8 h-6 transition duration-75" />
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
                                <h2 className='text-gray-500'>Gender</h2>
                                <div className="mt-2">
                                    <label className="inline-flex items-center">
                                    <input
                                        {...register("gender")}
                                        checked={gender === "female"}
                                        onChange={onGenderChange}
                                        type="radio"
                                        className="form-radio"
                                        name="role"
                                        value="female"
                                    />
                                    <span className="ml-2">Female</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                    <input
                                        {...register("gender")}
                                        checked={gender === "male"}
                                        onChange={onGenderChange}
                                        type="radio"
                                        className="form-radio"
                                        name="role"
                                        value="male"
                                    />
                                    <span className="ml-2">Male</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                    <input
                                        {...register("gender")}
                                        checked={gender === "other"}
                                        onChange={onGenderChange}
                                        type="radio"
                                        className="form-radio"
                                        name="role"
                                        value="other"
                                    />
                                    <span className="ml-2">Other</span>
                                    </label>
                                </div>
                            </div>
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Height</h2>
                                <input 
                                    type="number" 
                                    placeholder="Height"
                                    {...register("height", { 
                                        required: "Height is required"
                                    })}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    {errors.height && 
                                    <div className='flex pt-2 pl-2 text-red-700'>
                                        <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                        <p className="px-2">{errors.height?.message}</p>
                                    </div>}
                            </div>
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Weight</h2>
                                <input 
                                    type="number" 
                                    placeholder="Weight"
                                    {...register("weight", { 
                                        required: "Weight is required"
                                    })}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    {errors.weight && 
                                    <div className='flex pt-2 pl-2 text-red-700'>
                                        <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                        <p className="px-2">{errors.weight?.message}</p>
                                    </div>}
                            </div>
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Diseases</h2>
                                <textarea disabled
                                    placeholder="Diseases"
                                    {...register("diseases", { 
                                        required: "Diseases is required"
                                    })}
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    {errors.diseases && 
                                    <div className='flex pt-2 pl-2 text-red-700'>
                                        <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                        <p className="px-2">{errors.diseases?.message}</p>
                                    </div>}
                            </div>
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Birth</h2>
                                <div>
                                    <ReactDatePicker className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                                        selected={startDate}
                                        onSelect={handleDate} 
                                        onChange={handleDate}
                                        popperPlacement="bottom-start"
                                    />
                                </div>
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
        </PatientLayout> 
    )
}
