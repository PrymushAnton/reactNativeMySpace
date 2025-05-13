import { createContext, useContext, useState, useEffect } from "react";
import {
	IUser,
	IAuthContext,
	IAuthContextProviderProps,
	IReturnError,
} from "./context.types";
import { Response } from "../../../shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const initialValue: IAuthContext = {
	user: null,
	login: async (email: string, password: string): Promise<IReturnError[] | string> => "",
	register: async (
		email: string,
		password: string,
	): Promise<IReturnError[] | string> => "",
	isAuthenticated: () => false,
	logout: () => {},
	registerEmail: async (email: string, password: string, code: number) => { return ""; },
};

const authContext = createContext<IAuthContext>(initialValue);

export function useAuthContext() {
	return useContext(authContext);
}

export function AuthContextProvider(props: IAuthContextProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);
	const router = useRouter();
	
	async function registerEmail(email: string, password: string, code: number) {
		try {
			
			const response = await fetch("http://192.168.1.10:3001/user/verify-email-code", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email, 
					password: password,
					code: code,
				}),
			});
	
			const result = await response.json();
			if (result.status === "error") {
				return result.message;
			}
			
			await AsyncStorage.setItem("token", result.data);
			await getData(result.data);

			router.replace("/main/");
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function getData(token: string) {
		try {
			const response = await fetch("http://192.168.1.10:3001/user/me", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const result: Response<IUser> = await response.json();
			if (
				result.status === "error" ||
				result.status === "error-validation"
			) {
				return;
			}
			setUser(result.data);
		} catch (error) {
			console.error(error);
		}
	}

	async function login(email: string, password: string) {
		try {
			const response = await fetch("http://192.168.1.10:3001/user/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const result: Response<string> = await response.json();
			if (result.status === "error") {
				return result.message;
			}
			if (result.status === "error-validation") {
				return result.data;
			}
			await AsyncStorage.setItem("token", result.data);
			await getData(result.data);
			router.replace("/main/");
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function register(
		email: string,
		password: string,
	) {

		try {
			const response = await fetch("http://192.168.1.10:3001/user/reg", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const result: Response<string> = await response.json();
			if (result.status === "error") {
				return result.message;
			}
			if (result.status === "error-validation") {
				return result.data;
			}

			await fetch("http://192.168.1.10:3001/user/send-email-code", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			router.replace({pathname: "/registerEmail/", params: {email: email, password: password}});
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	function isAuthenticated() {
		return !!user;
	}

	async function logout() {
		await AsyncStorage.removeItem("token");
		setUser(null);
		router.replace("/login/");
	}

	async function getToken() {
		const token = await AsyncStorage.getItem("token");
		if (!token) return;
		getData(token);
	}

	useEffect(() => {
		getToken();
	}, []);

	return (
		<authContext.Provider
			value={{
				user,
				login,
				register,
				isAuthenticated,
				logout,
				registerEmail,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
}
