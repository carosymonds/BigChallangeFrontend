import { NextPage } from "next";
import { ISubmission } from "../../../interfaces/submission";
import { DoctorsLayout } from "../../../components/layouts";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useQuery } from "react-query";
import {
  DeletePrescription,
  GetSubmissionById,
  TakeSubmission,
  UploadPrescription,
} from "../../../services/submission.services";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { LoaderOverlay } from "../../../components/ui/LoaderOverlayComponent";
import { StateComponent } from "../../../components/ui";

interface Props {
  submission: ISubmission;
  params: any;
}

const AdminSubmissionPage: NextPage<Props> = ({ params }) => {
  const fetchData = async () => {
    try {
      const data = await GetSubmissionById(params.id);
      return data;
    } catch (error: any) {
      console.log(error);
    }
  };

  const [formError, setFormError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsLoading] = useState("");

  const hanldeUploadPrescription = async (data: File) => {
    try {
        setIsLoading("Uploading...")
        setFormError(false);
        const response = await UploadPrescription(params.id, data);
        if (response.hasError) {
            setFormError(true);
            setErrorMessage(response?.message as string);
            setIsLoading("")
        } else {
            setIsLoading("")
            setSuccessMessage(response);
            refetch();
        }
    } catch (error) {
      setFormError(true);
      console.log(error);
    }
  };

  const onFilechange = (e: any) => {
    hanldeUploadPrescription(e.target.files[0]);
  };

  const hanldeTakeSubmission = async() => {
    try {
        setIsLoading("Accepting...")
        setFormError(false);
        const response = await TakeSubmission(params.id);
        if (response.hasError) {
            setFormError(true);
            setErrorMessage(response?.message as string);
            setIsLoading("")
        } else {
            setIsLoading("")
            setSuccessMessage(response);
            refetch();
        }
    } catch (error) {
      setFormError(true);
      console.log(error);
    }
  }

  const deleteSubscription = async () => {
    try {
        setIsLoading("Deleting...")

      const response = await DeletePrescription(params.id);
      if (response.hasError) {
        setFormError(true);
        setErrorMessage(response?.message as string);
      } else {
        setSuccessMessage(response);
      }
      setIsLoading("")

    } catch (error: any) {
      console.log(error);
    }
  };

  const { isLoading, isError, data, error, refetch} = useQuery(
    "submissions",
    fetchData
  );

  return (
    <DoctorsLayout title="Submission" pageDescription="Submission">
    {isUploading && <LoaderOverlay primaryMessage={isUploading} />}
      <div className="bg-white p-8">
        <div className="w-full pb-3">
          <Link href="/">
            <a>
              <ArrowLongLeftIcon className="w-8 h-6 transition duration-75" />
            </a>
          </Link>
        </div>
        <div className="border-b-2 border-gray-200 pb-3 flex justify-between">
          <div>
            <div className="flex">
              <h1 className="text-gray-900 font-medium text-xl leading-8 my-1">
                {data?.title}
              </h1>
              <StateComponent state={data?.state} />
            </div>
            <h2 className="text-xs text-gray-400">
              {data?.patient_name} • {data?.patient_birth}
            </h2>
          </div>

          {data?.state == "pending" && (
            <div
              className={data?.state == "pending" ? "disabled:opacity-25" : ""}
            >
              <button
                onClick={() => hanldeTakeSubmission()}
                className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded"
              >
                Accept submission
              </button>
            </div>
          )}
        </div>
        <div className="flex pt-3 items-center space-x-2 text-gray-900 leading-8 text-normal">
          <div className="grid grid-cols-1 text-sm w-full">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2">
                <h2 className="text-gray-500">Name</h2>
                <span>{data?.patient_name}</span>
              </div>
              <div className="px-4 py-2">
                <h2 className="text-gray-500">Email address</h2>
                <span>{data?.patient_email}</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="px-4 py-2">
                <h2 className="text-gray-500">Other Info</h2>
                <span>{data?.patient_previous_treatments}</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div className="px-4 py-2">
                <h2 className="text-gray-500">Symptoms</h2>
                <span>{data?.symptoms}</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <form className="px-4 py-2">
                <h2 className="text-gray-500">
                  Prescriptions
                </h2>
                <div className="my-2">
                  {data?.prescriptions ? (
                    <div>
                      <Link href={data.prescriptions}>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                          <svg
                            className="fill-current w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                          </svg>
                          <span>Download</span>
                        </button>
                      </Link>
                      <button onClick={() => deleteSubscription()}>
                        <TrashIcon className="w-8 h-6 transition duration-75" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <label className="block mb-2">
                        <span className="sr-only">Choose File</span>
                        <input
                          type="file"
                          accept="text/plain"
                          onChangeCapture={onFilechange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </label>
                    </>
                  )}
                </div>
              </form>
            </div>
            {data?.state == "pending" && (
              <div className="w-full pb-3 flex items-center py-2 px-4 bg-blue-50 text-blue-800 mt-5">
                <InformationCircleIcon className="w-8 h-6 transition duration-75" />
                <span>Accept this submission to add a diagnosis</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DoctorsLayout>
  );
};

export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  };
}

export default AdminSubmissionPage;
