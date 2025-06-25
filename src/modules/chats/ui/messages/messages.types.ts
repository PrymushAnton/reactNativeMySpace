export interface IMessage {
	id: number;
	members: {
		profile_id: number;
		profile: {
			user: {
				id: number;
				username: string;
				first_name: string;
				last_name: string;
				email: string;
			};
			avatars: {
				image: string;
			}[];
		};
	}[];
	messages: {
		id: number;
		content: string;
		sent_at: string;
		attached_image: string;
		author_id: number;
		chat_group_id: number;
		author: {
			id: number;
			user_id: number;
		};
	}[];
}

export interface IMessageData {
	id: number;
	content: string;
	sent_at: string;
	attached_image: string;
	author_id: number;
	chat_group_id: number;
	author: {
		user: {
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			username: string;
		};
		avatars: {
			image: string;
		}[];
	};
}
