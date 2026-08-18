import type { ALL_BLOGS_QUERY_RESULT } from "@repo/shared";
import { BlogCard } from "#/components/BlogCard";
import { BlinkingCursor } from "#/components/ui/BlinkingCursor";

interface BlogListingPageProps {
  items: ALL_BLOGS_QUERY_RESULT["items"];
  page: number;
}

export function BlogListingPage({ items, page }: BlogListingPageProps) {
  return (
    <>
      <div className="p-4 w-full border-2 border-foreground my-8 uppercase font-heading">
        <div className="h-8 w-full mb-8 p-1 mt-2 border-2 border-foreground">
          <div className="h-full fill-pattern"></div>
        </div>
        <p className="uppercase">Directory listing – drive 8</p>
        <h1 className="text-2xl text-white py-2">Bloggen - side {page}</h1>
      </div>
      <ul>
        {items.map((item) => {
          return <BlogCard key={item?._id} post={item} />;
        })}
      </ul>
      <hr />
      <div className="font-heading uppercase mt-8 relative w-fit">
        1337 blocks free.
        <span className="inline-block absolute top-0 -right-8">
          <BlinkingCursor />
        </span>
      </div>
    </>
  );
}
