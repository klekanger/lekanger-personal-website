import { PortableText } from "@portabletext/react";
import { block } from "./block";
import type {
	DecoratorComponents,
	PortableTextValue,
	StrictComponents,
} from "./componentTypes";
import { list } from "./list";
import { marks } from "./marks";
import { types } from "./types";

// Defined at module scope so the object identity is stable across renders.
const components = {
	types,
	block,
	list,
	marks,
} satisfies StrictComponents & { marks: DecoratorComponents };
//   ^ TypeScript errors when the schema gains a custom object type or a custom
//     annotation without a matching handler here. Standard block styles, list
//     styles and decorators are NOT enforced — see `StrictComponents`.

export function CustomPortableText({
	value,
}: {
	value: PortableTextValue | null | undefined;
}) {
	return (
		<div className="prose lg:prose-xl">
			<PortableText components={components} value={value} />
		</div>
	);
}
