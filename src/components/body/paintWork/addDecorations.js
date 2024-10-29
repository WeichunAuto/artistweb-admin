import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import axiosInstance from "../../axios/request";
import { Navigate } from "react-router-dom";
import DecorationList from "./decorationList";

export default function AddDecorations(props) {
  const {
    isDecorationOpen,
    onDecorationOpenChange,
    selectedPaintWorkId,
    onTipsOpenChange,
    setTipsMsg,
    setIsMainDataFetched,
  } = props;

  const [isTokenValid, setIsTokenValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newDecoratedImage, setNewDecoratedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [newDecoratedImageValid, setNewDecoratedImageValid] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDecoratedImage(file);
    }
  };

  const closeHandler = () => {
    onDecorationOpenChange();
    setIsMainDataFetched(false); // refresh the main data.
  }

  const submitHandler = (e) => {
    if (varifyFields() === false) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("imageFile", newDecoratedImage);
    axiosInstance
      .post(`/addDecoration/${selectedPaintWorkId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === undefined && response.code === "ERR_NETWORK") {
          // TODO: Consider this is due to exceeding the max upload size.
          setIsTokenValid(true);
        } else {
          if (statusCode === 201) {
            setIsTokenValid(true);
            setNewDecoratedImage(null);
            setIsLoading(false);
            onDecorationOpenChange();
            onTipsOpenChange();
            setTipsMsg(
              "Congratulations, A Decoration Photo Was Successfully Added!"
            );
            setIsMainDataFetched(false); // refresh the main data.
          } else if (statusCode === 401) {
            // token is invalid.
            setIsTokenValid(false);
          } else if (statusCode === 403) {
            setIsTokenValid(true);
            setErrorMessage("Internal Server Error, Please Contact Admin.");
          } else if (statusCode === 500) {
            setIsTokenValid(true);
            setIsLoading(false);
            setErrorMessage(response.response.data);
          }
        }
      })
      .catch((error) => {
        console.error("Error setting about me:", error);
      });
  };

  const varifyFields = () => {
    if (newDecoratedImage === null) {
      setErrorMessage("You need to choose an image to upload.");
      setNewDecoratedImageValid(false);
      return false;
    } else if (!newDecoratedImage.type.startsWith("image")) {
      setNewDecoratedImageValid(false);
      setErrorMessage("You can only upload image files.");
      return false;
    } else if (newDecoratedImage.size >= 9999500) {
      setNewDecoratedImageValid(false);
      setErrorMessage("The maximum image size should be less than 10MB.");
      return false;
    }
    setNewDecoratedImageValid(true);
    setErrorMessage("");
    return true;
  };
  if (isTokenValid === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <Modal
          size="xl"
          isOpen={isDecorationOpen}
          onOpenChange={onDecorationOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Add A Decoration Image</ModalHeader>
                <ModalBody>
                  <div className="w-5/6 mx-auto flex flex-col gap-4 justify-center">
                    <label className="block w-full h-36 border-1 border-dashed rounded-lg p-4">
                      <p className="text-sm text-gray-500 pb-8 w-full text-center">
                        Choose your decoration image.{" "}
                        <span className="text-small text-red-500">*</span>
                      </p>
                      <input
                        type="file"
                        className="block w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-violet-50 file:text-blue-700
                                                hover:file:bg-violet-100"
                        onChange={handleImageChange}
                      />
                      <p className="mt-4 text-xs m-1 text-[#F31260]">
                        {!newDecoratedImageValid && errorMessage}
                      </p>
                    </label>
                  </div>
                  <DecorationList selectedPaintWorkId={selectedPaintWorkId}/>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={closeHandler}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isLoading}
                    onPress={submitHandler}
                  >
                    Submit
                  </Button>
                </ModalFooter>
                
              </>
            )}
          </ModalContent>
        </Modal>

        

      </div>
    );
  }
}
