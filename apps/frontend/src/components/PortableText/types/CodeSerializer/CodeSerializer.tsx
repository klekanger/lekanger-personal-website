import type { PortableTextTypeComponentProps } from "@portabletext/react";
import type { Code } from "@repo/shared";
import { highlightCode } from "@/lib/shiki";

export const CodeSerializer = ({
	value,
}: PortableTextTypeComponentProps<Code>) => {
	const { code, filename, language } = value;

	if (!code) return null;

	return (
		<figure>
			{filename ? <figcaption>{filename}</figcaption> : null}
			<div
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output — code is escaped as text nodes, never parsed as markup
				dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
			/>
		</figure>
	);
};
