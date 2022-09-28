import { useState, useContext, useEffect } from 'react';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { PatientLayout } from '../../components/layouts';
import { ISubmission } from '../../interfaces/submission';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { CreateSubmission, GetSubmissionById, UpdateSymptoms } from '../../services/submission.services';
import { ErrorComponent } from '../../components/ui/ErrorComponent';
import { SuccessComponent } from '../../components/ui/SuccessComponent';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

interface Props {
    params: any
}


const SubmissionPage:NextPage<Props> = ({ params }) => {
   
    const [formError, setFormError] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        if(params.id != 'new'){
            setIsEditMode(true);
        }
      }, [params.id]);

    const submitForm = async(data: ISubmission) => {
        try{            
            setFormError(false)
            
            const response = isEditMode ? await UpdateSymptoms(params.id, data) : await CreateSubmission(data);
            if(response.hasError){
                setFormError(true)
                setErrorMessage(response?.message as string)
            }else{
                setSuccessMessage(response)
                setTimeout(() => router.push('/'), 5000)
            }

        }catch(error){
            setFormError(true)
            console.log(error)
        }
    }

    const fetchData = async () => {
        try {
            const data = await GetSubmissionById(params.id);
            setValue('symptoms', data?.symptoms);
            return data;
        } catch (error: any) {
            console.log(error)
        }
    };

    const { isLoading, isError, data, error } = useQuery("submission", fetchData, {
        enabled: isEditMode
    });

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ISubmission>();
    return (
        <PatientLayout title="Submission" pageDescription="Submission">
            <form className="bg-white p-8" onSubmit={handleSubmit(submitForm)} noValidate >
                <div className="bg-white p-8">
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
                                <h1 className="text-gray-900 font-medium text-xl leading-8 my-1">{isEditMode ? ('Update submission') : ('Create submission')}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex pt-3 items-center space-x-2 text-gray-900 leading-8 text-normal">
                        <div className="grid grid-cols-1 text-sm w-full">
                            <div className="grid grid-cols-1">
                                <div className="px-4 py-2">
                                    <h2 className='text-gray-500'>Symptoms</h2>
                                    <textarea
                                        disabled={data?.state != 'pending' && isEditMode}
                                        placeholder="Stomach and abdominal pain, cramps and fever.."
                                        {...register("symptoms", { 
                                            required: "Symptoms is required"
                                        })}
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    {errors.symptoms && 
                                    <div className='flex pt-2 pl-2 text-red-700'>
                                        <ExclamationTriangleIcon className="w-6 h-6 transition duration-75" />
                                        <p className="px-2">{errors.symptoms?.message}</p>
                                    </div>}
                                </div>
                            </div>
                            {formError && (
                                <ErrorComponent primaryMessage={errorMessage} />
                            )}
                            {successMessage && (<SuccessComponent primaryMessage={successMessage} />)}
                            <div className='px-4 text-right'>
                                <button className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded">
                                {isEditMode ? ('Update') : ('Create')}
                                </button>                
                            </div>                  
                        </div>
                    </div>
                </div>
            </form>
        </PatientLayout>
    )
}

export function getServerSideProps(context:any) {
    return {
      props: {params: context.params}
    };
  }

export default SubmissionPage