import { NextPage} from 'next';
import { ISubmission } from '../../../interfaces/submission';
import { DoctorsLayout } from '../../../components/layouts';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useQuery } from 'react-query'
import { GetSubmissionById, TakeSubmission } from '../../../services/submission.services';

interface Props {
    submission: ISubmission,
    params: any
}


const AdminSubmissionPage:NextPage<Props> = ({params}) => {

    const fetchData = async () => {
        try {
            const data = await GetSubmissionById(params.id);
            return data;
        } catch (error: any) {
            console.log(error)
        }
    };

    const { isLoading, isError, data, error } = useQuery("submissions", fetchData);

    return (
        <DoctorsLayout title="Submission" pageDescription="Submission">
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
                            <h1 className="text-gray-900 font-medium text-xl leading-8 my-1">{data?.title}</h1>
                            <span className="py-0 px-4 inline-flex justify-center items-center ml-3 text-xs font-medium text-blue-800 bg-gray-200 rounded-3xl uppercase">{data?.state}</span>
                        </div>
                        <h2 className="text-xs text-gray-400">{data?.patient_name} • {data?.patient_birth}</h2>
                    </div>
                    <div className={data?.state == 'pending' ? 'disabled:opacity-25' : ''}>
                        <button onClick={()=> TakeSubmission(params.id)} className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded">
                            Accept submission
                        </button>                
                    </div>
                </div>
                <div className="flex pt-3 items-center space-x-2 text-gray-900 leading-8 text-normal">
                    <div className="grid grid-cols-1 text-sm w-full">
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Name</h2>
                                <span>{data?.patient_name}</span>
                            </div>
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Email address</h2>
                                <span>{data?.patient_email}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Other Info</h2>
                                <span>{data?.patient_previous_treatments}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Symptoms</h2>
                                <span>{data?.symptoms}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="px-4 py-2">
                                <h2 className='text-gray-500'>Prescriptions</h2>
                                <div>
                                    <button className="bg-gray-100 hover:bg-blue-700 text-gray-400 py-2 px-4 rounded">
                                        Choose file
                                    </button> 
                                    <span className='pl-2 text-gray-400 font-normal'>No file chosen</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full pb-3 flex items-center py-2 px-4 bg-blue-50 text-blue-800 mt-5'>
                            <InformationCircleIcon className="w-8 h-6 transition duration-75" />
                            <span>Accept this submission to add a diagnosis</span>
                        </div>
                    </div>
                </div>
            </div>
        </DoctorsLayout>
    )
}

export function getServerSideProps(context:any) {
    return {
      props: {params: context.params}
    };
  }

export default AdminSubmissionPage