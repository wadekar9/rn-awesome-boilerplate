import { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { getData } from '$utils/storage'
import { EStorageKeys } from "$constants/storage.constants";

const onRequest = async (config: any) => {
    const token = await getData(EStorageKeys.ACCESS_TOKEN);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
};

const onRequestError = (error: AxiosError) => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
    if (response.data.status === false) {
        return Promise.reject(response.data);
    }
    return response;
};

const onResponseError = (error: AxiosError) => {
    if (error.response?.status === 401) {
        // clear user local storage data
    }
    return Promise.reject(error.response?.data || error.message);
};


export const setupInterceptorsTo = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

export const convertToFormData = <T extends Record<string, any>>(data: T): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            } else {
                formData.append(key, value);
            }
        }
    });

    return formData;
};

export const convertToQueryParams = (params: Record<string, any>) => {

    const keyValuePairs = [];
    for (const key in params) {
        if (encodeURIComponent(params[key])) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        }
    }
    return keyValuePairs.join('&');
}