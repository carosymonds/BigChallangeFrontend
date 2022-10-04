import { NextPage } from "next";
import { ISubmission } from "../../../interfaces/submission";
import { DoctorsLayout } from "../../../components/layouts";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon, InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useQuery } from "react-query";
import {
  DeletePrescription,
  GetSubmissionById,
  TakeSubmission,
  UploadPrescription,
} from "../../../services/submission.services";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoaderOverlay } from "../../../components/ui/LoaderOverlayComponent";
import { StateComponent } from "../../../components/ui";
import { AuthContext } from "../../../context";
import Modal from "../../../components/ui/ModalComponent";

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

  const [showModal, setShowModal] = useState(false);


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

  const { isLoading, isError, data, error, refetch} = useQuery(
   [ "submission"], fetchData, 
  );
  

  return (
    <DoctorsLayout title="Submission" pageDescription="Submission">
    {(isUploading || isLoading) && <LoaderOverlay primaryMessage={isUploading} />}
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
              <h1 className="text-gray-900 font-medium text-xl leading-8 my-1 pr-2">
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
                className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded flex pr-2 align-middle"
              >
                Accept
                <CheckBadgeIcon className="w-6 pl-1"/>
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
            <div className="px-4 py-2">
              <h2 className="text-gray-500">
                Prescriptions
              </h2>
              <div className="my-2">
                {data?.prescriptions ? (
                  <div>
                    <Modal prescription={data?.prescriptions} submissionId={params.id} />
                  </div>
                ) : (
                  <>
                    {data?.state == "pending" ? <label className="block mb-2">
                      <span className="sr-only">Choose File</span>
                      <input
                        type="file"
                        disabled={true}
                        accept="text/plain"
                        onChangeCapture={onFilechange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:gray-blue-700"
                      />
                    </label> : 
                    <label className="block mb-2">
                    <span className="sr-only">Choose File</span>
                    <input
                      type="file"
                      accept="text/plain"
                      onChangeCapture={onFilechange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                  </label>}
                  </>
                )}
              </div>
              </div>
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
