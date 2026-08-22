import { PortableText } from "@portabletext/react";
import type { ALL_BLOGS_QUERY_RESULT } from "@repo/shared";
import { Link } from "@tanstack/react-router";
import { shortDate } from "#/utils/dateFormatters";

interface BlogCardProps {
  post: ALL_BLOGS_QUERY_RESULT["items"][0];
}

export function BlogCard(props: BlogCardProps) {
  const { post } = props;

  if (!post) return null;

  const blogUrl = post?.isExternalBlog
    ? post?.externalBlogUrl || "#"
    : `/blog-page/${post?.slug?.current}` || "#";

  return (
    <div className="pb-4 first:mt-12 border-t hover:cursor-pointer hover:bg-accent">
      <Link to={blogUrl}>
        <div className="flex flex-col md:flex-row pt-4">
          <div className="min-w-32">{shortDate(post._createdAt)}</div>
          <div className="w-full md:w-2/3">
            <h1 className="pb-2 text-white">{post?.title}</h1>
            <PortableText value={post?.overview} />
          </div>
        </div>
      </Link>
    </div>
  );
}
