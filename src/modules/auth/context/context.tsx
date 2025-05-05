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
};

const authContext = createContext<IAuthContext>(initialValue);

export function useAuthContext() {
	return useContext(authContext);
}

export function AuthContextProvider(props: IAuthContextProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);

	const router = useRouter();

	// useEffect(() => {
	// 	console.log(user);
	// }, [user]);

	async function getData(token: string) {
		try {
			const response = await fetch("http://192.168.3.11:3001/user/me", {
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
			const response = await fetch("http://192.168.3.11:3001/user/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: email, password: password }),
			});
			const result: Response<string> = await response.json();
			if (result.status === "error") {
				return result.message;
			}
			if (result.status === "error-validation") {
				return result.data;
			}
			getData(result.data);

			await AsyncStorage.setItem("token", result.data);
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
			const response = await fetch("http://192.168.3.11:3001/user/reg", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: username,
					email: email,
					password: password,
					confirmPassword: confirmPassword,
				}),
			});

			const result: Response<string> = await response.json();
			if (result.status === "error") {
				return result.message;
			}
			if (result.status === "error-validation") {
				return result.data;
			}
			getData(result.data);
			await AsyncStorage.setItem("token", result.data);
			router.navigate("/profile/");
			return "";
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	function isAuthenticated() {
		if (!user) {
			return false;
		}
		return true;
	}

	async function logout() {
		await AsyncStorage.removeItem("token");
		setUser(null);
		router.navigate("/login/");
	}

	async function getToken() {
		const token = await AsyncStorage.getItem("token");
		if (!token) {
			return;
		}
		getData(token);
	}

	useEffect(() => {
		getToken();
	}, []);

	return (
		<authContext.Provider
			value={{
				user: user,
				login: login,
				register: register,
				isAuthenticated: isAuthenticated,
				logout: logout,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
}
