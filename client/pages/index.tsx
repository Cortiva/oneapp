import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import AppEmptyState from "@/components/EmptyState";
import InputField from "@/components/InputField";
import MainLayout from "@/components/MainLayout";
import PaginationControls from "@/components/PaginationControls";
import Text from "@/components/Text";
import deviceService, { Device } from "@/services/deviceService";
import { Check, Plus, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [devices, setDevices] = useState<Device[] | []>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchDevices = async (page: number) => {
    try {
      setLoading(true);
      const data = await deviceService.fetchDevices(page, limit);
      const pagination = data.data.pagination;
      setDevices(data.data.data);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pagination.page);
      setLimit(pagination.limit);
      setTotal(pagination.total);
    } catch (error) {
      console.error("Failed to fetch devices", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices(currentPage);
  }, [currentPage]);

  // Select / Deselect logic
  const toggleSelect = (id: string) => {
    setSelectedRows((prev: any) => {
      const newSelection = prev.includes(id)
        ? prev.filter((item: any) => item !== id)
        : [...prev, id];
      return newSelection;
    });
  };

  const selectAll = () => {
    if (selectedRows.length === devices.length) {
      setSelectedRows([]);
    } else {
      const newSelection: any = devices.map((row) => row.id);
      setSelectedRows(newSelection);
    }
  };

  const handlePageClick = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handleNextClick = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [setCurrentPage, currentPage]);

  const handlePreviousClick = useCallback(() => {
    setCurrentPage(currentPage - 1);
  }, [setCurrentPage, currentPage]);

  const renderPages = useCallback(() => {
    const pages = [];
    const maxPagesToShow = 4;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= maxPagesToShow ||
        i === currentPage ||
        i > totalPages - 1 ||
        i < currentPage + maxPagesToShow
      ) {
        pages.push(
          <div
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 cursor-pointer`}
          >
            <Text
              text={i}
              color={`${currentPage === i ? "text-blue-500 font-bold" : ""}`}
            />
          </div>
        );
      } else if (
        i === maxPagesToShow + 1 ||
        i === totalPages - maxPagesToShow
      ) {
        pages.push(
          <span key={i} className="mx-1">
            ...
          </span>
        );
      }
    }

    return pages;
  }, [handlePageClick, currentPage, totalPages]);

  const filteredDevices = devices.filter(
    (device) =>
      device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.processor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.screenSize.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Breadcrumb
        title="Manage Devices"
        count={total}
        actions={
          <Button>
            <Plus className="mr-2" /> Device
          </Button>
        }
      />

      {filteredDevices.length > 0 && (
        <div className="flex flex-col bg-light-card dark:bg-dark-card mt-10 p-1 rounded-[14px]">
          <div className="grid grid-cols-2 gap-10 mb-6">
            <div className="col-span-2 lg:col-span-1"></div>
            <div className="col-span-2 lg:col-span-1">
              <div className="flex flex-row justify-end items-center">
                {selectedRows.length > 0 && (
                  <div className="flex flex-row space-x-4 mt-6">
                    <Button
                      isDeleteButton={true}
                      isProcessing={isProcessing}
                      isDisabled={isProcessing}
                      onClick={() => console.log("")}
                    >
                      Delete
                    </Button>
                  </div>
                )}
                <div className="w-[70%] ml-4">
                  <InputField
                    id="email"
                    placeholder={`Search Here`}
                    type="text"
                    hasPrefix={true}
                    prefixIcon={<Search size={18} />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <table className="w-full border-collapse min-w-max">
              <thead>
                <tr className="bg-white border-b border-border text-[13px]">
                  <th className="w-[35%]">
                    <div className="flex items-center py-4 px-4">
                      <div
                        className={`flex justify-center items-center rounded-md h-[20px] w-[20px] mr-2 cursor-pointer ${
                          selectedRows.length === filteredDevices.length
                            ? "border border-primary-600 bg-primary text-white"
                            : "border border-border"
                        }`}
                        onClick={selectAll}
                      >
                        {selectedRows.length === filteredDevices.length && (
                          <Check />
                        )}
                      </div>
                      <Text text="Basic Info" />
                    </div>
                  </th>
                  <th className="w-[10%]">
                    <div className="flex flex-row items-center px-4">
                      Status
                    </div>
                  </th>
                  <th className="w-[15%]">
                    <div className="flex flex-row items-center px-4">
                      Email & Phone Number
                    </div>
                  </th>
                  <th className="w-[15%]">
                    <div className="flex flex-row items-center px-4">
                      Registration Number
                    </div>
                  </th>
                  <th className="w-[15%]">
                    <div className="flex flex-row items-center px-4">
                      Country/Region
                    </div>
                  </th>
                  <th className="w-[10%]">
                    <div className="flex flex-row items-center px-4">
                      Jobs Posted
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      filteredDevices.length - 1 > index
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <td className="w-[25%] cursor-pointer">
                      <div className="flex items-center py-4 px-4">
                        <div
                          className={`flex justify-center items-center rounded-md h-[20px] w-[20px] mr-2 cursor-pointer ${
                            selectedRows.includes(row.id)
                              ? "border border-primary-600 bg-primary text-white"
                              : "border border-border"
                          }`}
                          onClick={() => toggleSelect(row.id)}
                        >
                          {selectedRows.includes(row.id) && <Check />}
                        </div>
                        <div className="ml-2 flex flex-row items-center space-x-3">
                          <Text text={`${row.model}`} />
                        </div>
                      </div>
                    </td>
                    <td className="w-[20%]">
                      <div className={`flex py-4 px-4`}>
                        <div
                          className={`flex space-x-2 items-center rounded-full py-1 px-3 text-white ${
                            row.status === "Deleted"
                              ? "bg-[#E30045]"
                              : row.status === "Unverified"
                              ? "bg-amber-500"
                              : row.status === "Inactive"
                              ? "bg-slate-800"
                              : "bg-[#12B76A]"
                          } `}
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <Text text={row.status} />
                        </div>
                      </div>
                    </td>
                    <td className="w-[20%]">
                      <div className="flex flex-col py-4 px-4">
                        <Text text={row.manufacturer} />
                        <Text text={row.processor ?? ""} />
                      </div>
                    </td>
                    <td className="w-[10%]">
                      <div className="flex items-center py-4 px-4">
                        <Text text={row.storage} />
                      </div>
                    </td>
                    <td className="w-[15%]">
                      <div className="flex items-center py-4 px-4">
                        <Text text={`${row.location}, ${row.isDeleted}`} />
                      </div>
                    </td>
                    <td className="w-[10%]">
                      <div className="flex items-center py-4 px-4">
                        <Text text={`f`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <PaginationControls
            type="talents"
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
            renderPages={renderPages}
          />
        </div>
      )}

      {filteredDevices.length < 1 && (
        <AppEmptyState
          text="No device found"
          page="Device"
          buttonText="Click here"
        />
      )}
    </MainLayout>
  );
}
