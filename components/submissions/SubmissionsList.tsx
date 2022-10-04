import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { FC, useContext, useState } from "react";
import { useQuery } from "react-query";
import { Roles, States, SubmissionTable } from "../../constants/Enums";
import { AuthContext } from "../../context";
import { GetSubmissions } from "../../services/submission.services";
import {
  StateComponent,
  ErrorComponent,
  LoaderComponent,
  LoaderOverlay,
} from "../ui";

interface Props {
  showfilters?: boolean;
}

export const SubmissionsList: FC<Props> = ({ showfilters }) => {
  const { user } = useContext(AuthContext);

  const columns = [
    SubmissionTable.SUBMISSION_TITLE,
    user?.role == Roles.Patient ? SubmissionTable.DOCTOR_NAME : SubmissionTable.PATIENT_NAME,
    SubmissionTable.STATUS,
    SubmissionTable.VIEW,
  ];

  const handleIsPendingSelected = (isPendingSelected: boolean) => {
    setIsPendingSelected(isPendingSelected);
  };
  const [isPendingSelected, setIsPendingSelected] = useState(false);

  const fetchData = (isPendingSelected = true, showfilters?: boolean) => {
    if (user) {
      const response = GetSubmissions(
        user.role,
        isPendingSelected,
        !showfilters
      );
      return response;
    }
    return [];
  };

  const { isLoading, isError, data } = useQuery(
    ["submissions", isPendingSelected, showfilters, user],
    () => fetchData(isPendingSelected, showfilters)
  );
  const [search, setSearch] = React.useState("");

  const handleSearch = (event: any) => {
    setSearch(event.target.value.toLowerCase());
  };

  const submissionsResult = {
    nodes: data?.filter(
      (item) =>
        item.patient_name.toLowerCase().includes(search) ||
        item.title.toLowerCase().includes(search)
    ),
  };

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
          {showfilters && (
            <div className="sm:flex items-center justify-between mb-10">
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
                    <p>All</p>
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
            </div>
          )}
          <div className="flex justify-between">
            <div className="relative mb-5 w-4/12">
              <MagnifyingGlassIcon className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" />
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                className="w-full py-2 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
            <div>
            <Link href={`submission/new`}>
              <a className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded flex align-middle">
                <p className="text-sm font-medium leading-none text-white pr-1">
                  New
                </p>
                <PlusSmallIcon className="w-4" />
              </a>
            </Link>
            </div>
            
          </div>

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
                {submissionsResult.nodes?.map((submission) => (
                  <tr
                    key={submission.id}
                    className=" dark:bg-gray-900 dark:border-gray-700"
                  >
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                      <p>{submission.title}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user?.role == 'patient' ? submission?.doctor_name || '-' : submission.patient_name}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                      <StateComponent state={submission.state} />
                    </td>
                    <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm text-blue-600">
                      {user?.role == Roles.Patient ? (
                        <Link href={`submission/${submission.id}`}>
                          <a>
                            <p>
                              {submission.state == States.Pending
                                ? "Edit"
                                : "View"}
                            </p>
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

                {submissionsResult.nodes?.length == 0 && (
                  <tr>
                    <td></td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                      <p>No submissions available</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
