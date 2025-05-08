import { ReactNode } from "react";
import { IReturnError } from "../../../shared/types/response";

export interface IUser {
	username: string;
	email: string;
	name: string;
	surname: string;
	phoneNumber: string;
	birthDate: string;
}

export interface IAuthContext {
	user: IUser | null;
	login: (email: string, password: string) => Promise<IReturnError[] | string>;
	register: (
		username: string,
		email: string,
		password: string,
		confirmPassword: string,
	) => Promise<IReturnError[] | string>;
	isAuthenticated: () => boolean;
	logout: () => void;
	registerEmail: (emailCode: string) => Promise<string | IReturnError[]>;
}

export interface IAuthContextProviderProps {
	children?: ReactNode;
}
export { IReturnError };

