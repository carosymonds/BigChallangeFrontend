import { useState, useContext } from 'react';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { PatientLayout } from '../../components/layouts';
import { ISubmission } from '../../interfaces/submission';
import Link from 'next/link';

interface Props {
    submission: ISubmission
}


const SubmissionPage:NextPage<Props> = ({ submission }) => {


  return (
    <PatientLayout title="Submission" pageDescription="Submission">
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
                        <h1 className="text-gray-900 font-medium text-xl leading-8 my-1">Create submission</h1>
                    </div>
                </div>
            </div>
            <div className="flex pt-3 items-center space-x-2 text-gray-900 leading-8 text-normal">
                <div className="grid grid-cols-1 text-sm w-full">
                    <div className="grid grid-cols-1">
                        <div className="px-4 py-2">
                           <h2 className='text-gray-500'>Symptoms</h2>
                           <textarea
                                placeholder="Stomach and abdominal pain, cramps and fever..."
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="px-4 py-2">
                            <h2 className='text-gray-500'>Other Info</h2>
                            <textarea
                                placeholder='Partial excision (craterization, saucerization, or diaphysectomy) bone...'
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                    </div>  
                    <div className='px-4 text-right'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded">
                            Submit
                        </button>                
                    </div>                  
                </div>
            </div>
        </div>
    </PatientLayout>
  )
}

export default SubmissionPage