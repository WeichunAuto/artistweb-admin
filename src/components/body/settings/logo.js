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

function Logo() {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [savedLogoURL, setSavedLogoURL] = useState(null);
  const [uploadLogoImage, setUploadLogoImage] = useState(null);
  const [isLogoBtnLoading, setIsLogoBtnLoading] = useState(false);
  const [isFetchLogoImage, setIsFetchLogoImage] = useState(true);

  useEffect(() => {
    if (isFetchLogoImage) {
      axiosInstance
        .get("/fetchSavedLogo/image", { responseType: "blob" })
        .then((response) => {
          const statusCode = response.status;
          if (statusCode === 200) {
            setSavedLogoURL(URL.createObjectURL(response.data));
            setIsFetchLogoImage(false);
          } else if (statusCode === 401) {
            setIsLogoBtnLoading(true);
            // token is invalid.
            setIsTokenValid(false);
          } else if (statusCode === 404) {
            setIsFetchLogoImage(false);
          }
        });
    }
  }, [isFetchLogoImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadLogoImage(file);
    }
  };

  const submitHandler = (e) => {
    if (varifyFields() === false) return;
    setIsLogoBtnLoading(true);

    const formData = new FormData();
    formData.append("logoImage", uploadLogoImage);
    axiosInstance
      .post(`/setLogoImage`, formData, {
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
            setIsFetchLogoImage(true);
            setIsLogoBtnLoading(false);
            setErrorMessage("");
            setUploadLogoImage(null);
          } else if (statusCode === 401) {
            setIsLogoBtnLoading(true);
            // token is invalid.
            setIsTokenValid(false);
          } else if (statusCode === 403) {
            setIsTokenValid(true);
            setErrorMessage("Internal Server Error, Please Contact Admin.");
          } else if (statusCode === 500) {
            setIsTokenValid(true);
            setIsLogoBtnLoading(false);
            setErrorMessage(response.response.data);
          }
        }
      })
      .catch((error) => {
        console.error("Error setting about me:", error);
      });
  };

  const varifyFields = () => {
    if (uploadLogoImage === null) {
      setErrorMessage("You need to choose an image to upload.");
      return false;
    } else if (!uploadLogoImage.type.startsWith("image")) {
      setErrorMessage("You can only upload image files.");
      return false;
    } else if (uploadLogoImage.size >= 102400) {
      setErrorMessage("The maximum image size should be less than 100 KB.");
      return false;
    }
    setErrorMessage("");
    return true;
  };
  if (isTokenValid === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Card className="min-h-12 max-h-56">
        <CardHeader className="">
          <p className="text-sm text-gray-500 w-full text-left">
            Set your logo here.{" "}
            <span className="text-small text-red-500">*</span>
          </p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-row gap-8">
            {savedLogoURL && (
              <div className="mx-auto size-20">
                <Image
                  src={savedLogoURL}
                  alt="logo"
                  className="size-16 rounded-full"
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
            isLoading={isLogoBtnLoading}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default Logo;
