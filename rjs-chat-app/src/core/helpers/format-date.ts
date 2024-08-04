import moment from "moment";

export const formatDate = (ref: Date): string => {
	const date = moment(ref);

	return date.format("HH:mm a | MMM Do");
};
