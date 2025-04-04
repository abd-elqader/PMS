export interface LoginFormData {
    email: string;
    password: string;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
}

export interface UserList {
    id: string;
    userName: string;
    isActivated: boolean;
    email: string;
    phoneNumber: string;
    creationDate: string;
}

export interface LoginResponse {
    token: string;
    user: UserData;
}

export interface Props {
    saveLoginData: (userData: UserData) => void;
}

export interface DecodedToken {
    user?: {
        id: string;
        name: string;
        email: string;
    };
    iat?: number;
    exp?: number;
}
