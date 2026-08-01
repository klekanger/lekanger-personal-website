import type { PortableTextTypeComponentProps } from "@portabletext/react";
import type { Code } from "@repo/shared";

export const CodeSerializer = ({
	value,
}: PortableTextTypeComponentProps<Code>) => {
	const { code, filename, language } = value;

	if (!code) {
		return null;
	}

	return (
		<figure>
			{filename ? <figcaption>{filename}</figcaption> : null}
			<pre data-language={language}>
				<code>{code}</code>
			</pre>
		</figure>
	);
};
