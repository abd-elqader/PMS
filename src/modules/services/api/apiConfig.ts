export const baseURL = "https://upskilling-egypt.com:3003/api/v1";
export const imgURL = "https://upskilling-egypt.com:3003/";

export const USER_URLS = {
    LOGIN: `/Users/Login`,
    REGISTER: `/Users/Register`,
    FORGET_PASS: `/Users/Reset/Request`,
    RESET_PASS: `/Users/Reset`,
    CHANGE_PASS: `/Users/ChangePassword`,
    GET_USERS: `/Users`,
    TOGGLE_USER_STATUS: (id: string) => `/Users/${id}`,
    VERIFY: `/Users/Verify`,
};

export const PROJECT_URLS = {
    GET_PROJECTS_BY_MANAGER: "/Project/manager",
    GET_PROJECTS_BY_EMPLOYEE: "/Project/employee",
    CREATE_PROJECT: "/Project",
    UPDATE_PROJECT: (id: string | undefined) => `/Project/${id}`,
    delete_PROJECT: (id: number) => `/Project/${id}`,
    GET_PROJECT: (id: string | undefined) => `/Project/${id}`,
};
