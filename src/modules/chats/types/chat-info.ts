export interface IContactCard {
	image?: string;
	name: string;
	surname: string;
	text?: string;
	date?: Date;
	wasWatched?: boolean;
}

export interface IMyMessage {
	text: string;
	date: Date;
	wasWatched: boolean;
}

export interface IAnotherUserMessage {
	image?: string;
	name: string;
	surname: string;
	text: string;
	date: Date;
	wasWatched: boolean;
}
