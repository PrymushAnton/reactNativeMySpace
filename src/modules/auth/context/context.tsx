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
		username: string,
		email: string,
		password: string,
		confirmPassword: string
	): Promise<IReturnError[] | string> => "",
	isAuthenticated: () => false,
	logout: () => {},
	registerEmail: async (email: string, code: number) => { return ""; },
};

const authContext = createContext<IAuthContext>(initialValue);

export function useAuthContext() {
	return useContext(authContext);
}

export function AuthContextProvider(props: IAuthContextProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);
	const [userEmail, setUserEmail] = useState<string>("");
	const router = useRouter();

	async function registerEmail(email: string, code: number) {
		try {
			const response = await fetch("http://192.168.1.10:3001/user/verify-email-code", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: userEmail, // Используем email из контекста
					code: code,
				}),
			});
	
			const result = await response.json();
			if (result.status === "error") {
				return result.message;
			}
	
			router.navigate("/profile/");
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
			router.navigate("/profile/");
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	async function register(
		username: string,
		email: string,
		password: string,
		confirmPassword: string
	) {
		try {
			const response = await fetch("http://192.168.1.10:3001/user/reg", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					email,
					password,
					confirmPassword,
				}),
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

			setUserEmail(email); // сохраняем email
			await fetch("http://192.168.1.10:3001/user/send-email-code", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			router.navigate("/registerEmail/");
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
		router.navigate("/login/");
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
