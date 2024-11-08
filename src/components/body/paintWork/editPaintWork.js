import React, { useState } from "react";
import axiosInstance from "../../axios/request";
import { Navigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Switch,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
/**
 * This component is used for uploading new artwork.
 * @param {*} props
 * @returns
 */
function EditPaintWork(props) {
  const {
    isOpen,
    onOpenChange,
    onTipsOpenChange,
    setTipsMsg,
    setIsMainDataFetched,
    aPaintWork,
    setAPaintWork,
  } = props;

  const [isTokenValid, setIsTokenValid] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "status") {
      setAPaintWork({ ...aPaintWork, [name]: value });
    } else {
      setAPaintWork({ ...aPaintWork, [name]: e.target.checked });
    }
  };

  const submitHandler = (e) => {
    const { title, price, year, dimensionWidth, dimensionHeight } = aPaintWork;

    if (title.trim() === "") {
      setErrorMsg("Please input the title.");
      return;
    }
    if (year === null) {
      setErrorMsg("Please provide the year when you created the art work.");
      return;
    }
    if (dimensionWidth === "") {
      setErrorMsg("Please give a size in width.");
      return;
    }
    // console.log('dimensionHeight = ', dimensionHeight)
    if (dimensionHeight === "") {
      setErrorMsg("Please give a size in height.");
      return;
    }
    if (price === "") {
      setErrorMsg("Please give a price.");
      return;
    }
    setIsLoading(true);

    if (aPaintWork.imageURL) {
      // remove imageURL, no need to be updated
      delete aPaintWork.imageURL;
    }

    const formData = new FormData();
    const paintStatus = aPaintWork.status ? "active" : "paused";

    const editPaintWork = {
      id: aPaintWork.id,
      title: aPaintWork.title,
      description: aPaintWork.description,
      dimensionHeight: aPaintWork.dimensionHeight,
      dimensionWidth: aPaintWork.dimensionWidth,
      price: aPaintWork.price,
      status: paintStatus,
    };

    formData.append(
      "paintWork",
      new Blob([JSON.stringify(editPaintWork)], {
        type: "application/json",
      })
    );

    axiosInstance
      .put("/editPaintWork", formData)
      .then((response) => {
        const statusCode = response.status;
        if (statusCode === undefined && response.code === "ERR_NETWORK") {
          // TODO: Consider this is due to exceeding the max upload size.
          setIsTokenValid(true);
        } else {
          if (statusCode === 200) {
            setIsTokenValid(true);
            setIsLoading(false);
            onOpenChange(); // close this form.
            onTipsOpenChange(); // pop up tips window.
            setTipsMsg("Congratulations, Successfully Updated!");
            setIsMainDataFetched(false); // refresh the main data.
          } else if (statusCode === 401) {
            setIsTokenValid(false);
          }
        }
      })
      .catch((error) => {
        console.error("Error editing product:", error);
      });
  };
  if (isTokenValid === false) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        size="2xl"
      >
        <ModalContent className="px-2">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit a New Painting Work
              </ModalHeader>
              <ModalBody>
                {
                  <Input
                    isRequired
                    autoFocus
                    label="title"
                    name="title"
                    placeholder="Give a title for your painting"
                    value={aPaintWork.title}
                    onChange={handleInputChange}
                    // variant="bordered"
                  />
                }
                {
                  <Textarea
                    label="description"
                    name="description"
                    placeholder="You can say something about your work."
                    value={aPaintWork.description}
                    onChange={handleInputChange}
                  />
                }
                {
                  <div className="flex flex-row">
                    <Input
                      type="number"
                      label="dimension - width"
                      name="dimensionWidth"
                      isRequired
                      placeholder="Please give a size in width."
                      value={aPaintWork.dimensionWidth}
                      onChange={handleInputChange}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            mm
                          </span>
                        </div>
                      }
                    />
                    <Input
                      type="number"
                      label="dimension - height"
                      name="dimensionHeight"
                      isRequired
                      placeholder="Please give a size in height."
                      value={aPaintWork.dimensionHeight}
                      onChange={handleInputChange}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">
                            mm
                          </span>
                        </div>
                      }
                    />
                  </div>
                }

                {
                  <Input
                    type="number"
                    isRequired
                    label="price"
                    name="price"
                    placeholder="0.00"
                    className="basis-1/2"
                    value={aPaintWork.price}
                    onChange={handleInputChange}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                  />
                }

                {
                  <div className="grid gap-0  justify-items-end">
                    <Switch
                      size="sm"
                      name="status"
                      value={aPaintWork.status}
                      isSelected={aPaintWork.status}
                      onChange={handleInputChange}
                    >
                      Active
                    </Switch>
                    <p className="text-sm text-default-500">
                      Selected: {aPaintWork.status ? "active" : "paused"}
                    </p>
                  </div>
                }
                {/* Error tips */}
                <div className="w-full h-10 text-left text-red-600">
                  {errorMsg}
                </div>
              </ModalBody>

              <ModalFooter className="pt-20">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  onPress={submitHandler}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
}

export default EditPaintWork;
