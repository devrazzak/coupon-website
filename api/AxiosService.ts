// Importing necessary types and libraries
// Config variables for API URLs and language
import type { AxiosResponse } from 'axios';
// Axios response type
import axios from 'axios';

import { DEFAULT_LANGUAGE, api_base_url, social_api_base_url } from '@/utils/config';

// Axios for making HTTP requests

// Type definitions for axios services
export type RequestProps = {
    serverUrl: string;
    requestHeader: {
        'Content-Type'?: string;
        'Accept-Language': string;
        Authorization: string;
    };
};

// Function to generate the request properties based on server type, multipart flag, and social flag
function getIRequestProp(
    severType: boolean,
    isMultipart?: boolean,
    isSocial = false,
): RequestProps {
    // Choose the server URL based on whether it's a social server or not
    const serverUrl = severType ? social_api_base_url : api_base_url;

    // Retrieve user data / token from localStorage
    let idToken = '';
    if (typeof window !== 'undefined') {
        try {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            idToken = token || userData?.idToken || userData?.token || '';
        } catch {}
    }

    const requestHeader: RequestProps['requestHeader'] = {
        // Don't set a Content-Type for multipart/form-data. If we force
        // `multipart/form-data` here, the browser/axios won't append the
        // required `boundary=...`, so the server can't parse the body and the
        // upload fails. Leaving it unset lets the browser generate the full
        // `multipart/form-data; boundary=...` header automatically.
        'Accept-Language': DEFAULT_LANGUAGE,
        Authorization: idToken ? `Bearer ${idToken}` : '',
    };

    // Only set an explicit content type for JSON (and url-encoded social) payloads.
    if (isSocial) {
        requestHeader['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (!isMultipart) {
        requestHeader['Content-Type'] = 'application/json';
    }

    // Return the constructed server URL and request headers
    return {
        serverUrl: serverUrl,
        requestHeader,
    };
}

// Function to make a GET request using Axios
async function get<T>(
    url: string,
    parameter?: Record<string, unknown>,
    isSocialServer?: boolean,
): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios GET request and return the response
    return axios.get<T>(serverUrl + url, {
        params: parameter, // Query parameters to be passed in the request URL
        headers: requestHeader, // Request headers including authorization and content type
    });
}

// Function to make a POST request to a Google API using fetch
async function postGoogleAPI(
    url: string,
    body: string,
    isSocialServer?: boolean,
): Promise<Response> {
    // Get the server URL using the helper function (ignore request headers here)
    const { serverUrl } = getIRequestProp(isSocialServer || false, false, true);

    // Make a POST request using fetch and return the response
    return fetch(serverUrl + url, {
        method: 'POST', // HTTP method
        headers: {
            Accept: 'application/json', // Expect a JSON response
            'Content-Type': 'application/x-www-form-urlencoded', // Form-encoded request body
        },
        body: body, // The request body (formatted as a string)
    });
}

// Function to make a POST request using Axios
async function post<T>(
    url?: string,
    body?: object,
    isSocialServer?: boolean,
    isMultipart?: boolean,
): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false, isMultipart);

    // Make an Axios POST request and return the response
    return axios.post<T>(serverUrl + url, body, {
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Function to make a PUT request using Axios
async function put<T>(
    url?: string,
    body?: object,
    isSocialServer?: boolean,
): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios PUT request and return the response
    return axios.put<T>(serverUrl + url, body, {
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Function to make a PATCH request using Axios
async function patch<T>(
    url: string,
    body: object,
    isSocialServer?: boolean,
): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios PATCH request and return the response
    return axios.patch<T>(serverUrl + url, body, {
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Function to make a DELETE request using Axios
async function remove<T>(
    url: string,
    body?: object,
    isSocialServer?: boolean,
): Promise<AxiosResponse<T>> {
    // Get the server URL and request headers using the helper function
    const { serverUrl, requestHeader } = getIRequestProp(isSocialServer || false);

    // Make an Axios DELETE request and return the response
    return axios.delete<T>(serverUrl + url, {
        data: body, // Include the request body in the DELETE request
        headers: requestHeader, // Pass the appropriate request headers
    });
}

// Exporting all the API service methods as part of AxiosServices object
const AxiosServices = {
    get, // Exporting GET method
    post, // Exporting POST method
    put, // Exporting PUT method
    patch, // Exporting PATCH method
    remove, // Exporting DELETE method
    postGoogleAPI, // Exporting custom Google API POST method
};

// Export AxiosServices as the default export of the module
export default AxiosServices;
