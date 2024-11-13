import axios from "axios";
export const baseURL = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: localStorage.getItem("token")}
});
// Users URLS
export const USERS_URLS ={
    LOGIN : `/Users/Login`,
    FORGER_REQUEST : `/Users/Reset/Request`,
    RESET_PASS : `/Users/Reset`,
    GET_USER: (id) => `/Users${id}`,

    
};
// CATEGORY_ URLS
export const CATEGORY_URLS = {
    GET_CATEGORIES : "/Category/"
}