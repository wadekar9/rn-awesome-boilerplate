export interface IAuthUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
}

export interface ILoginResponse {
    user: IAuthUser;
    token: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

