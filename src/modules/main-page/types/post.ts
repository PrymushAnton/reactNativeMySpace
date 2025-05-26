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
	likes?: number;
	views?: number;
}

export type IUserPostWithUser = IUserPost & {user : IUser}