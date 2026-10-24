import type {
  ALL_BLOGS_QUERY_RESULT,
  ALL_SHOWCASES_QUERY_RESULT,
} from "@repo/shared";
import { BlogCard } from "#/components/BlogCard";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";

interface BlogListingPageProps {
  items: ALL_BLOGS_QUERY_RESULT["items"] | ALL_SHOWCASES_QUERY_RESULT["items"];
  page: number;
  title: string;
}

export function BlogListing({ items, page, title }: BlogListingPageProps) {
  return (
    <>
      <div className="my-8 w-full border-2 border-foreground p-4 font-heading uppercase">
        <div className="mt-2 mb-8 h-8 w-full border-2 border-foreground p-1">
          <div className="h-full fill-pattern"></div>
        </div>
        <p className="uppercase">Directory listing – drive 8</p>
        {title && (
          <h1 className="py-2 text-lg text-white md:text-2xl">
            {`${title} - side ${page}`}
          </h1>
        )}
      </div>
      <ul>
        {items.map((item) => {
          return <BlogCard key={item?._id} post={item} />;
        })}
      </ul>
      <hr />
      <div className="relative mt-8 w-fit font-heading uppercase">
        1337 blocks free.
        <BlinkingCursor />
      </div>
    </>
  );
}
