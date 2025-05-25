import { IUser } from "./user";


export interface IUserPost {
    id?: number;
    userId?: number;

	name: string;
	description: string;
	image: string;
	defaultTags: string[];
	customTags: string[];
	link: string;

	// avatar?: string;
	user: IUser
	likes?: number;
	views?: number;
}