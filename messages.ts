export interface CrankMessage {
	type: "crank-message";
	value: number;
}

export type Message = CrankMessage;
