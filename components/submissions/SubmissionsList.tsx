import Link from "next/link";
import React, { FC, useContext, useState } from "react";
import { useQuery } from "react-query";
import { Roles, States, SubmissionTable } from "../../constants/Enums";
import { AuthContext } from "../../context";
import { GetSubmissions } from "../../services/submission.services";
import { StateComponent, ErrorComponent, LoaderComponent, LoaderOverlay  } from "../ui";

interface Props {
  showfilters?: boolean;
}

export const SubmissionsList:FC<Props> = ({showfilters}) => {
  const columns = [
    SubmissionTable.SUBMISSION_TITLE,
    SubmissionTable.PATIENT_NAME,
    SubmissionTable.STATUS,
    SubmissionTable.VIEW,
  ];
  const { user } = useContext(AuthContext);

  const handleIsPendingSelected = (isPendingSelected: boolean) => {
  
    setIsPendingSelected(isPendingSelected);
  };
  const [isPendingSelected, setIsPendingSelected] = useState(false);

  const fetchData = (isPendingSelected = true, showfilters?:boolean) => {
    if(user) {
      const response = GetSubmissions(user.role, isPendingSelected, !showfilters);
      return response;
    }
    return [];
  }
  
  const { isLoading, isError, data } = useQuery(["submissions", isPendingSelected, showfilters, user ], () => fetchData(isPendingSelected, showfilters));
 
  if (isLoading) {
    return <LoaderOverlay primaryMessage="Loding submissions..." />;
  }
  if (isError) {
    return <ErrorComponent primaryMessage="No submissions found" />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {showfilters && <div className="sm:flex items-center justify-between mb-10">
            <div className="flex items-center">
              <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-gray-800 cursor-pointer	">
                <div
                  onClick={() => handleIsPendingSelected(false)}
                  className={
                    isPendingSelected
                      ? `py-2 px-8 text-gray-600 dark:text-gray-200  hover:text-gray-700 `
                      : `py-2 px-8 bg-indigo-100 text-gray-700 rounded-full`
                  }
                >
                  <p>{user?.role == 'doctor' ? 'In Progress' : 'All'}</p>
                </div>
              </a>
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-gray-800 ml-4 sm:ml-8 cursor-pointer	">
                <div
                  onClick={() => handleIsPendingSelected(true)}
                  className={
                    !isPendingSelected
                      ? `py-2 px-8 text-gray-600 dark:text-gray-200  hover:text-gray-700 `
                      : `py-2 px-8 bg-indigo-100 text-gray-700 rounded-full`
                  }
                >
                  <p>Pending</p>
                </div>
              </a>
            </div>
            {user?.role == Roles.Patient && <Link href={`submission/new`}>
              <a className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded">                  
                <p className="text-sm font-medium leading-none text-white">New</p>
              </a>
            </Link>}
          </div>}
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
                      <StateComponent state={submission.state} />
                    </td>
                    <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm text-blue-600">
                      {user?.role == Roles.Patient ? (
                        <Link href={`submission/${submission.id}`}>
                          <a>
                            <p>{submission.state == States.Pending ? "Edit" : "View"}</p>
                          </a>
                        </Link>
                      ) : (
                        <Link href={`admin/submission/${submission?.id}`}>
                          <a>
                            <p>View</p>
                          </a>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}

                {data?.length == 0 && <tr>
                  <td></td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                    <p>No submissions available</p>
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
