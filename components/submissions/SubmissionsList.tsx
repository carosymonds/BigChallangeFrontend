import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { SubmissionTable } from "../../constants/Enums";
import { GetSubmissions } from "../../services/submission.services";
import { ErrorComponent } from "../ui/ErrorComponent";
import { LoaderComponent } from "../ui/LoaderComponent";

export const SubmissionsList = () => {
  const columns = [SubmissionTable.SUBMISSION_TITLE, SubmissionTable.PATIENT_NAME, SubmissionTable.STATUS, SubmissionTable.VIEW]
  const { isLoading, isError, data, error } = useQuery(
    "submissions",
    GetSubmissions
  );

  if (isLoading) {
    return (
      <LoaderComponent/>
    );
  }
  if (isError) {
    return( <ErrorComponent/>)
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-5 py-3 bg-gray-50 text-xs font-medium text-left text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((submission) => (
                  <tr
                    key={submission.id}
                    className=" dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                      <p>{submission.title}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                      <p className="text-gray-900 whitespace-no-wrap text-center">
                        {submission.patient_name}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                      <span className="py-1 px-4 inline-flex justify-center items-center text-sm font-medium text-blue-800 bg-gray-200 rounded-full uppercase">
                        {submission.state}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm text-blue-600">
                      <Link href={`admin/submission/${submission.id}`}>
                        <a>
                          <p>View</p>
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
