import { AxiosError, AxiosResponse } from "axios";
import api from "./api";

export interface FetchDeviceResponse {
  status: number;
  message: string;
  data: Device;
}

export interface FetchDevicesResponse {
  status: number;
  message: string;
  data: {
    data: Device[];
    pagination: {
      limit: number;
      page: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface Device {
  id: string;
  model: string;
  manufacturer: string;
  screenSize: string;
  processor: string;
  ram: number;
  storage: number;
  status: string;
  isDeleted: boolean;
  images: string[];
  totalUnits: number;
  location: string;
}

interface RegisterDeviceRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  staffId: string;
  phoneNumber: string;
  officeLocation: string;
}

interface ApiError {
  message: string;
  status?: number;
}

const handleError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      message: error.response.data?.message || "An error occurred",
      status: error.response.status,
    };
  }
  return { message: error.message || "An error occurred" };
};

// Device Service
const deviceService = {
  /**
   * Register new device
   * @param credentials
   * @returns
   */
  registerDevice: async (
    credentials: RegisterDeviceRequest
  ): Promise<FetchDeviceResponse> => {
    try {
      const response: AxiosResponse<FetchDeviceResponse> = await api.post(
        "/users/login",
        credentials
      );
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },

  /**
   * Fetch devices
   * @param userData
   * @returns Promise
   */
  fetchDevices: async (
    page: number,
    limit: number
  ): Promise<FetchDevicesResponse> => {
    try {
      const response: AxiosResponse<FetchDevicesResponse> = await api.get(
        `/devices/all?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError);
    }
  },
};

export default deviceService;
