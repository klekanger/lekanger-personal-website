import type { ALL_BLOGS_QUERY_RESULT } from "@repo/shared/types/sanity.types";
import { Link } from "@tanstack/react-router";
import { BlogCard } from "#/components/BlogCard";

interface BlogPromoProps {
  blogPosts: ALL_BLOGS_QUERY_RESULT["items"];
}

export function BlogPromo(props: BlogPromoProps) {
  const { blogPosts = [] } = props;
  if (!blogPosts) return null;

  return (
    <section className="my-10 w-full md:my-16">
      <p className="font-heading uppercase" aria-hidden="true">
        Load "$",8
      </p>
      <h2 className="my-2 flex w-full py-1 text-base uppercase md:text-xl lg:w-[80%]">
        <span className="bg-background pr-2 text-foreground" aria-hidden="true">
          0
        </span>

        <span className="flex grow justify-between bg-foreground px-1 text-background">
          <span>"Fra bloggen</span>
          <span aria-hidden="true">" 00 2A</span>
        </span>
      </h2>

      {blogPosts.map((post) => {
        return <BlogCard key={post._id} post={post} headingAs="h3" />;
      })}
      <div
        className="flex w-full justify-between pt-4 font-heading uppercase lg:pr-16"
        aria-hidden="true"
      >
        664 blocks free{" "}
        <Link
          to="/blog-page"
          search={{ page: 1 }}
          className="px-1 py-1 text-white hover:bg-foreground hover:text-background"
        >
          Alle innlegg &gt;
        </Link>
      </div>
    </section>
  );
}
