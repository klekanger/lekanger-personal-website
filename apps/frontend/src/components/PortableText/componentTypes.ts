import type {
	DefaultPortableTextMark,
	InferStrictComponents,
	InferValue,
	PortableTextMarkComponent,
} from "@portabletext/react";
import type { SanityQueries } from "@sanity/client";

/**
 * The `_type` Sanity actually stores, keyed by the name TypeGen emits for it.
 *
 * An array member that points at a registered object type may rename it —
 * `defineField({ type: "youtube", name: "YouTube" })` in `blog.body` — and the
 * member name, not the referenced type, becomes the stored `_type`. Schema
 * extraction drops that rename and inlines the referenced type, so the generated
 * union claims `_type: "youtube"` for documents that really carry
 * `_type: "YouTube"`. The PascalCase names are load-bearing: production content
 * is already published with them, so the schema cannot be renamed to match.
 *
 * Remove an entry here once TypeGen preserves the array member name.
 */
type StoredTypeNames = {
	youtube: "YouTube";
	twitter: "Twitter";
};

/** Re-stamps `_type` on the members TypeGen misnames — see `StoredTypeNames`. */
type WithStoredTypeName<TValue> = TValue extends {
	_type: infer TType extends keyof StoredTypeNames;
}
	? Omit<TValue, "_type"> & { _type: StoredTypeNames[TType] }
	: TValue;

/**
 * Array value type for every Portable Text item shape across all registered
 * queries, exactly as TypeGen describes it. `SanityQueries` is the
 * `declare module "@sanity/client"` augmentation TypeGen emits (because
 * `overloadClientMethods` is on), so this widens by itself whenever a query is
 * added. This is what loaders hand back, so it is what `CustomPortableText`
 * accepts.
 */
export type PortableTextValue = InferValue<SanityQueries[keyof SanityQueries]>;

/**
 * The same union with `_type` corrected to what Sanity stores. Everything that
 * has to agree with the runtime `_type` — the component map, serializer props —
 * is derived from this rather than from `PortableTextValue`.
 */
export type StoredPortableTextValue = Array<
	WithStoredTypeName<PortableTextValue[number]>
>;

/**
 * Strict component map. Note what this does and does not enforce: a handler is
 * *required* only for names outside Portable Text's built-in vocabulary — so
 * custom object types (`youtube`, `code`, …) and custom annotations are checked,
 * but standard block styles (`normal`, `h2`, `blockquote`) and standard list
 * styles (`bullet`, `number`) stay optional and fall back to the library
 * defaults. Handlers for shapes the queries never return are always rejected.
 */
export type StrictComponents = InferStrictComponents<StoredPortableTextValue>;

/**
 * Decorators (`strong`, `code`, …) are plain strings in `children[].marks`, not
 * entries in `markDefs`, so TypeGen cannot describe them and `StrictComponents`
 * rejects them. Intersect this with `StrictComponents["marks"]` to register
 * decorator handlers while keeping annotations strictly checked. `link` is
 * excluded because this schema models it as an annotation, which
 * `StrictComponents` already types from its `markDefs` shape.
 */
export type DecoratorComponents = Partial<
	Record<Exclude<DefaultPortableTextMark, "link">, PortableTextMarkComponent>
>;

/**
 * A single Portable Text member picked by its stored `_type`, for serializers
 * whose value shape has no usable name in `@repo/shared`: the inline image is
 * anonymous there (it only exists as a member of the `body` union), and
 * `Youtube` / `Twitter` carry the wrong `_type` (see `StoredTypeNames`).
 */
export type PortableTextValueOfType<
	TType extends StoredPortableTextValue[number]["_type"],
> = Extract<StoredPortableTextValue[number], { _type: TType }>;
