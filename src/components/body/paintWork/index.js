import React, { useState, useEffect } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  useDisclosure,
  Spacer,
  Badge,
} from "@nextui-org/react";
import {
  PlusIcon,
  SearchIcon,
  ChevronDownIcon,
  PreviewIcon,
} from "../../../icons/icons";
import AddPaintWork from "./addPaintWork";
import EditPaintWork from "./editPaintWork";
import { columns, statusOptions } from "./data";
import { capitalize } from "../../utils";
import axiosInstance from "../../axios/request";
import TipsPop from "../tipsPop";
import WarnPop from "./warnPop";
import AddDecorations from "./addDecorations";
import { ButtonGroup } from "react-bootstrap";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "TITLE",
  "DESCRIPTION",
  "PRICE",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export default function PaintWork() {
  const [isMainDataFetched, setIsMainDataFetched] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [artWorks, setArtWorks] = useState([]);

  useEffect(() => {
    if (isMainDataFetched === false) {
      (async () => {
        const response = await axiosInstance.get("/fetchPaintWorks");
        setMainData(response.data);
        setIsMainDataFetched(true);
      })();
    }
  }, [isMainDataFetched]);

  useEffect(() => {
    if (mainData.length > 0) {
      (async () => {
        const updatedMainData = await Promise.all(
          mainData.map(async (aPaintWork) => {
            try {
              const response = await axiosInstance.get(
                `/getPaintWorkCover/${aPaintWork.id}/image`,
                { responseType: "blob" }
              );

              const imageURL = URL.createObjectURL(response.data);
              return { ...aPaintWork, imageURL };
            } catch (error) {
              console.error(
                "Error fetching image for aPaintWork ID:",
                aPaintWork.id,
                error
              );
              return { ...aPaintWork, imageURL: "" };
            }
          })
        );
        setArtWorks(updatedMainData);
      })();
    }
  }, [mainData]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "",
    direction: "",
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // manage the state of opening a addPaintWork form to upload a new paint work.
  const { isOpen: isEditOpen, onOpenChange: onEditOpenChange } = useDisclosure(); 
  const { isOpen: isTipsOpen, onOpenChange: onTipsOpenChange } =
    useDisclosure(); // manage the state of opening a Tips.
  const { isOpen: isWarnOpen, onOpenChange: onWarnOpenChange } =
    useDisclosure(); // manage the state of opening a warn pop.
  const { isOpen: isDecorationOpen, onOpenChange: onDecorationOpenChange } =
    useDisclosure(); // manage the state of adding a decoration image.
    

  const [tipsMsg, setTipsMsg] = useState("")
  const [aPaintWork, setAPaintWork] = useState(null)

  const [dropItem, setDropItem] = useState({
    id: -1,
    title: "",
  });
  const [selectedPaintWorkId, setSelectedPaintWorkId] = useState(-1);

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...artWorks];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.title.includes(filterValue)
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [artWorks, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column.toLowerCase()];
      const second = b[sortDescriptor.column.toLowerCase()];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user, columnKey) => {
      const addDecorationImage = (id) => {
        setSelectedPaintWorkId(id);
        onDecorationOpenChange();
      };

      /**
       * send a request to delete an item.
       * @param {*} id
       */
      const deleteItem = (id, title) => {
        setDropItem({ id, title });
        onWarnOpenChange();
      };

      const editAPaintWork = (aPaintWork) => {
        setAPaintWork(aPaintWork)
        onEditOpenChange()
        
      }

      const cellValue = user[columnKey.toLowerCase()];
      switch (columnKey) {
        case "TITLE":
          return user.decorationCount > 1 ? ( // when decorationCount > 1 then display the badge 
            <Badge
              content={user.decorationCount}
              size="sm"
              color="secondary"
              placement="top-left"
            >
              <User
                avatarProps={{ radius: "lg", src: user.imageURL }}
                description={user.title}
                name={cellValue}
              >
                {user.title}
              </User>
            </Badge>
          ) : ( // when decorationCount > 1 then no display the badge
            <Badge size="sm" color="secondary" placement="top-left">
              <User
                avatarProps={{ radius: "lg", src: user.imageURL }}
                description={user.title}
                name={cellValue}
              >
                {user.title}
              </User>
            </Badge>
          );
        case "DESCRIPTION":
          return (
            <p className="text-bold text-small capitalize max-w-[300px] line-clamp-2">
              {cellValue}
            </p>
          );
        case "STATUS":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "ACTIONS":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Button size="sm" variant="light" onPress={() => editAPaintWork(user)}>
                Edit
              </Button>
              <ButtonGroup>
                <Button
                  size="sm"
                  radius="full"
                  isIconOnly
                  color="primary"
                  variant="light"
                  onPress={() => addDecorationImage(user.id)}
                >
                  <PlusIcon size="16" />
                </Button>
                <Spacer />
                <Button
                  size="sm"
                  radius="full"
                  isIconOnly
                  color="primary"
                  variant="light"
                >
                  <PreviewIcon />
                </Button>
              </ButtonGroup>
              <Button
                size="sm"
                variant="light"
                onPress={() => deleteItem(user.id, user.title)}
              >
                Delete
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [onWarnOpenChange, onDecorationOpenChange, onEditOpenChange]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        {/* <img src={artWorks[0].imageURL}/> */}
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by title..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {artWorks.length} paintWorks
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    artWorks.length,
    onSearchChange,
    onClear,
    onOpen,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onNextPage,
    onPreviousPage,
  ]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[582px]",
        }}
        className=" h-full pt-4 pl-2 pr-4"
        selectedKeys={selectedKeys}
        selectionMode="single"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "ACTIONS" ? "center" : "left"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No works found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddPaintWork
        fields={{
          title: true,
          description: true,
          year: true,
          price: true,
          dimension: true,
          img: true,
          active: true,
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange} // control to close the modalForm after adding a new paintWork.
        onTipsOpenChange={onTipsOpenChange} // control to pop up the tips window.
        setTipsMsg={setTipsMsg}
        setIsMainDataFetched={setIsMainDataFetched} // control to excute the useEffect() method to refresh the main data.
      />

      <EditPaintWork 
        isOpen = {isEditOpen}
        onOpenChange={onEditOpenChange}
        onTipsOpenChange={onTipsOpenChange} // control to pop up the tips window.
        setTipsMsg={setTipsMsg}
        setIsMainDataFetched={setIsMainDataFetched}
        aPaintWork={aPaintWork}
        setAPaintWork={setAPaintWork}

      />

      <TipsPop
        isTipsOpen={isTipsOpen}
        onTipsOpenChange={onTipsOpenChange}
        tips={tipsMsg}
      />

      <WarnPop
        isWarnOpen={isWarnOpen}
        onWarnOpenChange={onWarnOpenChange}
        dropItem={dropItem}
        setIsMainDataFetched={setIsMainDataFetched}
      />

      <AddDecorations
        isDecorationOpen={isDecorationOpen}
        onDecorationOpenChange={onDecorationOpenChange}
        selectedPaintWorkId={selectedPaintWorkId}
        onTipsOpenChange={onTipsOpenChange}
        setTipsMsg={setTipsMsg}
        setIsMainDataFetched={setIsMainDataFetched}
      />
    </>
  );
}
