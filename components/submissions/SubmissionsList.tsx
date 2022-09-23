import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { GetSubmissions } from "../../services/submission.services";

export const SubmissionsList = () => {
  const columns = ["Submission title", "Patient name", "Status", ""];
  const { isLoading, isError, data, error } = useQuery(
    "submissions",
    GetSubmissions
  );

  if (isLoading) {
    return (
      <div>
        <div
          role="status"
          className="flex flex-col items-center justify-center absolute right-0.5 bottom-2 text-right	"
        >
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    return <div>Something went wroong</div>;
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
