export interface CrankMessage {
	type: "crank-message";
	value: number;
}

export interface HumidityMessage {
	type: "humidity-message";
	value: number;
}

export interface DistanceMessage {
	type: "distance-message";
	value: number;
}

export type Message = CrankMessage | HumidityMessage | DistanceMessage;
