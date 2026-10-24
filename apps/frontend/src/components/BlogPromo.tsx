import type { ALL_BLOGS_QUERY_RESULT } from "@repo/shared/types/sanity.types";
import { BlogCard } from "#/components/BlogCard";

interface BlogPromoProps {
  blogPosts: ALL_BLOGS_QUERY_RESULT["items"];
}

export function BlogPromo(props: BlogPromoProps) {
  const { blogPosts = [] } = props;
  if (!blogPosts) return null;

  return (
    <section className="my-10 md:my-16">
      <h2 className="pt-4 text-base text-white uppercase md:text-2xl">
        Fra bloggen
      </h2>
      {blogPosts.map((post) => {
        return <BlogCard key={post._id} post={post} />;
      })}
    </section>
  );
}
