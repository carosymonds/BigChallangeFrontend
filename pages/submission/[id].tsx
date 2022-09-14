import { useState, useContext } from 'react';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { ISubmission } from '../../interfaces/submission';
import { DoctorsLayout } from '../../components/layouts';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface Props {
    submission: ISubmission
}


const ProductPage:NextPage<Props> = ({ submission }) => {


  return (
    <DoctorsLayout title="Submission" pageDescription="Submission">
        <div className="bg-white p-8">
            <div className='w-full pb-3'>
                <ArrowLongLeftIcon className="w-8 h-6 transition duration-75" />
            </div>
            <div className='border-b-2 border-gray-200 pb-3 flex justify-between'>
                <div>
                    <div className='flex'>
                        <h1 className="text-gray-900 font-medium text-xl leading-8 my-1">Hepatic Infraction</h1>
                        <span className="py-0 px-4 inline-flex justify-center items-center ml-3 text-xs font-medium text-blue-800 bg-gray-200 rounded-3xl ">Pending</span>
                    </div>
                    <h2 className="text-xs text-gray-400">Theresa Webb • 3/4/16</h2>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded">
                        Accept submission
                    </button>                
                </div>
            </div>
            <div className="flex pt-3 items-center space-x-2 text-gray-900 leading-8 text-normal">
                <div className="grid grid-cols-1 text-sm">
                    <div className="grid grid-cols-2">
                        <div className="px-4 py-2">
                            <h2 className='text-gray-500'>Email address</h2>
                            <span>theresawebb@example.com</span>
                        </div>
                        <div className="px-4 py-2">
                            <h2 className='text-gray-500'>Phone</h2>
                            <span>(406) 555-0120</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="px-4 py-2">
                           <h2 className='text-gray-500'>Other Info</h2>
                           <span>Partial excision (craterization, saucerization, or diaphysectomy) bone (eg, osteomyelitis); proximal or middle phalanx of finger</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1">
                        <div className="px-4 py-2">
                           <h2 className='text-gray-500'>Symptoms</h2>
                           <span>Stomach and abdominal pain, cramps and fever</span>
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
                    <div className='w-full pb-3 flex items-center py-2 px-4'>
                        <InformationCircleIcon className="w-8 h-6 transition duration-75" />
                        <span>Accept this submission to add a diagnosis</span>
                    </div>
                </div>
            </div>
        </div>
    </DoctorsLayout>
  )
}







export default ProductPage