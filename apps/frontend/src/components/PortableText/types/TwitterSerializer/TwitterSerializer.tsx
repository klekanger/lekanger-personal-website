import type { PortableTextTypeComponentProps } from "@portabletext/react";
import { Tweet } from "react-tweet";
import type { PortableTextValueOfType } from "../../componentTypes";

export const TwitterSerializer = ({
	value,
}: PortableTextTypeComponentProps<PortableTextValueOfType<"Twitter">>) => {
	if (!value?.tweetId) {
		return null;
	}

	return <Tweet id={value.tweetId} />;
};
