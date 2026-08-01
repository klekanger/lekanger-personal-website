import type { PortableTextTypeComponentProps } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/imageUtils";
import type { PortableTextImageValue } from "../../componentTypes";

export const ArticleImageSerializer = ({
	value,
}: PortableTextTypeComponentProps<PortableTextImageValue>) => {
	const { asset } = value;

	if (!asset) {
		return null;
	}

	// Pass the whole object rather than just the asset, so hotspot/crop apply.
	const builder = urlForImage({ ...value, asset });
	const small = builder.width(400).url();
	const medium = builder.width(800).url();
	const large = builder.width(1200).url();

	return (
		<img
			src={medium}
			srcSet={`${small} 400w, ${medium} 800w, ${large} 1200w`}
			sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
			alt={value.alt || ""}
		/>
	);
};

// TODO check the breakpoints, adjust breakpoints to whatever is reasonable in this project
