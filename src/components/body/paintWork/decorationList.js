import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/request";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Button,
} from "@nextui-org/react";
import { DeleteIcon } from "../../../icons/icons";

function DecorationList(props) {
  const { selectedPaintWorkId } = props;
  const [decorations, setDecorations] = useState([]);
  const [isFetchDecorationImage, setIsFetchDecorationImage] = useState(false);
  const [isFetchDecorations, setIsFetchDecorations] = useState(true);

  useEffect(() => {
    if (isFetchDecorations) {
      (async () => {
        const response = await axiosInstance.get(
          `/fetchDecorations/${selectedPaintWorkId}`
        );
        const statusCode = response.status;
        if (statusCode === 200) {
          setDecorations(response.data);
          setIsFetchDecorationImage(true);
          setIsFetchDecorations(false);
        }
      })();
    }
  }, [selectedPaintWorkId, isFetchDecorations]);

  useEffect(() => {
    if (decorations.length > 0 && isFetchDecorationImage) {
      (async () => {
        const updatedMainData = await Promise.all(
          decorations.map(async (decoration) => {
            try {
              const response = await axiosInstance.get(
                `/getOptimizedDecorationImage/${decoration.id}/image`,
                { responseType: "blob" }
              );
              const imageURL = URL.createObjectURL(response.data);
              return { ...decoration, imageURL, isDelConfirm: false };
            } catch (error) {
              console.error(
                "Error fetching image for aPaintWork ID:",
                decoration.id,
                error
              );
              return { ...decoration, imageURL: "" };
            }
          })
        );
        setDecorations(updatedMainData);
        setIsFetchDecorationImage(false);
      })();
    }
  }, [decorations, isFetchDecorationImage]);

  const deleteDecoration = (item) => {
    axiosInstance.delete(`/deleteDecoration/${item.id}`).then((response) => {
      const statusCode = response.status;
      if (statusCode === 200) {
        setIsFetchDecorations(true);
        
      }
    });
  };

  const columns = [
    {
      key: "imageName",
      label: "NAME",
    },
    {
      key: "cover",
      label: "COVER",
    },
    {
      key: "operation",
      label: "OPERATION",
    },
  ];

  return (
    <div className="p-2">
      <Table aria-label="Decoration lists." selectionMode="single">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "operation" ? "end" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {decorations.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: item.imageURL }}
                    name={item.imageName}
                  ></User>
                </TableCell>
                <TableCell>{item.cover ? "Y" : "N"}</TableCell>
                <TableCell className="text-default-400">
                  <span className="grid justify-items-end w-full h-full text-lg ">
                    {item.isDelConfirm ? (
                      <Button size="sm">Confirm</Button>
                    ) : (
                      <DeleteIcon
                        className="cursor-pointer"
                        onClick={() => deleteDecoration(item)}
                      />
                    )}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default DecorationList;
