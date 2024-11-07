import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@nextui-org/react";
import axiosInstance from "../../axios/request";
import { Navigate } from "react-router-dom";

function ForegroundImage() {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedImageURL, setSavedImageURL] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [isImageBtnLoading, setIsImageBtnLoading] = useState(false);
  const [isFetchImage, setIsFetchImage] = useState(true);

  useEffect(() => {
    if (isFetchImage) {
      axiosInstance
        .get("/fetchSavedForegroundImage/image", { responseType: "blob" })
        .then((response) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            setSavedImageURL(URL.createObjectURL(response.data));
            setIsFetchImage(false);
          } else if (statusCode === 401) {
            setIsImageBtnLoading(true);
            // token is invalid.
            setIsTokenValid(false);
          } else if (statusCode === 404) {
            setIsFetchImage(false);
          }
        });
    }
  }, [isFetchImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(file);
    }
  };

  const submitHandler = (e) => {
    if (varifyFields() === false) return;
    setIsImageBtnLoading(true);

    const formData = new FormData();
    formData.append("foregroundImage", uploadImage);
    axiosInstance
      .post(`/setForegroundImage`, formData, {
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
            setIsFetchImage(true);
            setIsImageBtnLoading(false);
            setErrorMessage("");
            setUploadImage(null);
          } else if (statusCode === 401) {
            setIsImageBtnLoading(true);
            // token is invalid.
            setIsTokenValid(false);
          } else if (statusCode === 403) {
            setIsTokenValid(true);
            setErrorMessage("Internal Server Error, Please Contact Admin.");
          } else if (statusCode === 500) {
            setIsTokenValid(true);
            setIsImageBtnLoading(false);
            setErrorMessage(response.response.data);
          }
        }
      })
      .catch((error) => {
        console.error("Error setting about me:", error);
      });
  };

  const varifyFields = () => {
    if (uploadImage === null) {
      setErrorMessage("You need to choose an image to upload.");
      return false;
    } else if (!uploadImage.type.startsWith("image")) {
      setErrorMessage("You can only upload image files.");
      return false;
    } else if (uploadImage.size >= 2560000) {
      setErrorMessage("The maximum image size should be less than 500 KB.");
      return false;
    }
    setErrorMessage("");
    return true;
  };
  if (isTokenValid === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Card className="min-h-12">
        <CardHeader className="">
          <p className="text-sm text-gray-500 w-full text-center">
            Set foreground image here.{" "}
            <span className="text-small text-red-500">*</span>
          </p>
        </CardHeader>
        <CardBody>
          <div className="mx-auto flex flex-col gap-2 justify-center">
            {savedImageURL && (
              <div className="mx-auto">
                <Image
                  src={savedImageURL}
                  alt="Image"
                  className="h-96 rounded-md"
                />
              </div>
            )}

            <label className="block w-full h-16 border-1 border-dashed rounded-lg p-4">
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
              <p className="mt-4 text-xs m-1 text-[#F31260]">{errorMessage}</p>
            </label>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end bg-white/30 bottom-0 border-t-1">
          <Button
            className="text-tiny"
            color="secondary"
            variant="light"
            radius="full"
            size="sm"
            isLoading={isImageBtnLoading}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default ForegroundImage;
