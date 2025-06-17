import { IUserFromBackend } from "./post";
import { IUser } from "../../auth/context/context.types";

export interface IBackendPost {
	id: number;
	title: string;
	text: string;
	views: number;
	likes: number;
	link: string[] | null;
	userId: number;
	tags: string[];
	images: string[];
	user: IUserFromBackend; 
}


export interface IPostProps {
	id?: number;
	name: string;
	text: string;
	hashtags?: string[];
	photo?: string[];
	link?: string[];
	likes: number;
	views: number;
	user: IUser; 
	onRefresh?: () => void;
}
