import Link from 'next/link'
import React from 'react'

export const SubmissionsList = () => {
    const columns = [
        "Submission title", "Patient name", "Created at", "Status", ""
    ]
  return (
    <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                {
                                columns.map((column) => (
                                    <th key={column}
                                        className="px-5 py-3 bg-gray-50 text-xs font-medium text-left text-gray-500 uppercase tracking-wider">
                                        {column}
                                    </th>
                                ))
                                }                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr className=" dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <p>Hepatic infraction</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <p className="text-gray-900 whitespace-no-wrap text-center">Theresa Robins</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-600 whitespace-no-wrap">
                                        3/4/06
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <a href="#" className="flex items-center p-2 text-base font-normal text-left rounded-lg  hover:bg-gray-100 ">
                                        <span className="py-1 px-4 inline-flex justify-center items-center text-sm font-medium text-blue-800 bg-gray-200 rounded-full ">Pending</span>
                                    </a>
                                </td>
                                <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm text-blue-600">
                                    <Link href="/submission/12">
                                        <a>
                                            <p>View more</p>
                                        </a>
                                    </Link>
                                </td>
                            </tr>
                            <tr className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <p>Hepatic infraction</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">Theresa Robins</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        3/4/06
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <a href="#" className="flex items-center p-2 text-base font-normal rounded-lg  hover:bg-gray-100 ">
                                        <span className="py-1 px-4 inline-flex justify-center items-center text-sm font-medium text-blue-800 bg-gray-200 rounded-full ">Pending</span>
                                    </a>
                                </td>
                                <td className="w-1/5 px-5 py-5 border-b text-center border-gray-200 bg-white text-sm text-blue-600">
                                    <p>
                                        View more
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
