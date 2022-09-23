import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { DoctorsLayout } from '../layouts'

export const DoctorProfile = () => {
  return (
    <DoctorsLayout title="Profile" pageDescription="Profile">
        <div className="bg-white p-8">
            <div className='w-full pb-3'>
                <ArrowLongLeftIcon className="w-8 h-6 transition duration-75" />
            </div>
            <div className='border-b-2 border-gray-200 pb-3 flex justify-between'>
                <div>
                    <div className='flex'>
                        <h1 className="text-gray-900 font-medium text-xl leading-8 my-1">Tom Hook</h1>
                    </div>
                </div>
            </div>
            <div className="flex pt-3 items-center space-x-2 text-gray-900 leading-8 text-normal">
                <div className="grid grid-cols-1 text-sm w-full">
                    <div className="grid grid-cols-2">
                    <div className="px-4 py-2">
                        <h2 className='text-gray-500'>Name</h2>
                        <input
                            type="text"
                            defaultValue="Female"
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                        </div>
                        <div className="px-4 py-2">
                            <h2 className='text-gray-500'>Email</h2>
                            <input
                                type="text"
                                defaultValue="Female"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div className="px-4 py-2">
                            <h2 className='text-gray-500'>Grade</h2>
                            <input
                                type="number"
                                defaultValue={2}
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                        <div className="px-4 py-2">
                            <h2 className='text-gray-500'>Speciality</h2>
                            <input
                                type="text"
                                defaultValue="cardio"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                
                    <div className='text-right px-4 py-2'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded">
                            Update
                        </button>                
                    </div>
                </div>
            </div>
        </div>
    </DoctorsLayout>
  )
}
