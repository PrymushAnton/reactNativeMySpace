export type ILogin =
	| { email: string; phoneNumber?: never; password: string }
	| { phoneNumber: string; email?: never; password: string };
