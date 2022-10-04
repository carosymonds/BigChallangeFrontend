import {
  ArrowDownTrayIcon,
  PhoneXMarkIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import { Roles } from "../../constants/Enums";
import { AuthContext } from "../../context";
import {
  DeletePrescription,
  DeleteSubmission,
} from "../../services/submission.services";
import { ErrorComponent } from "./ErrorComponent";
import { LoaderOverlay } from "./LoaderOverlayComponent";
import { SuccessComponent } from "./SuccessComponent";

interface Props {
  prescription: string;
  submissionId: string;
}

const Modal: FC<Props> = ({ prescription, submissionId }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsLoading] = useState("");
  const [formError, setFormError] = useState(false);
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const deleteSubmission = async () => {
    try {
      setIsLoading("Deleting...");
      const response = await DeletePrescription(submissionId);
      if (response.hasError) {
        setFormError(true);
        setErrorMessage(response?.message as string);
      } else {
        setSuccessMessage(response);
        setShowModal(false);
        router.replace("/");
      }
      setIsLoading("");
    } catch (error: any) {
      console.log(error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {isUploading && <LoaderOverlay primaryMessage={""} />}

      <button type="button" onClick={() => setShowModal(true)}>
        <span className="py-1 px-4 inline-flex justify-center items-center text-sm font-medium text-blue-800 bg-blue-300 rounded-full uppercase">
          Preview
          <ArrowDownTrayIcon className="w-8 h-6 transition duration-75" />
        </span>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Presctiption</h3>
                  <button
                    className=" background-transparent font-bold uppercase py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <XMarkIcon className="w-4" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <iframe
                    src={prescription}
                    width="500"
                    height="300"
                    frameBorder="0"
                  ></iframe>
                </div>
                {formError && <ErrorComponent primaryMessage={errorMessage} />}
                {successMessage && (
                  <SuccessComponent primaryMessage={successMessage} />
                )}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  {user?.role == Roles.Doctor && <button onClick={() => deleteSubmission()}>
                    <TrashIcon className="w-8 h-6 transition duration-75" />
                  </button>}
                  <Link href={prescription}>
                    <a className="bg-blue-500 hover:bg-blue-600 text-sm  text-white py-2 px-4 rounded flex align-middle">
                      <p className="text-sm font-medium leading-none text-white pr-1">
                        Download
                      </p>
                      <ArrowDownTrayIcon className="w-4" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
