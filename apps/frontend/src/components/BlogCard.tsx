import { PortableText } from "@portabletext/react";
import type {
  ALL_BLOGS_QUERY_RESULT,
  ALL_SHOWCASES_QUERY_RESULT,
} from "@repo/shared";
import { Link } from "@tanstack/react-router";
import { shortDate } from "#/utils/dateFormatters";

interface BlogCardProps {
  post:
    | ALL_BLOGS_QUERY_RESULT["items"][0]
    | ALL_SHOWCASES_QUERY_RESULT["items"][0];
}

export function BlogCard(props: BlogCardProps) {
  const { post } = props;

  if (!post) return null;

  const href =
    post._type === "showcase"
      ? `/showcase/${post.slug?.current}`
      : post.isExternalBlog
        ? (post.externalBlogUrl ?? "#")
        : `/blog-page/${post.slug?.current}`;

  return (
    <div className="pb-4 first:mt-12 border-t hover:cursor-pointer hover:bg-accent">
      <Link to={href}>
        <div className="flex flex-col md:flex-row pt-4">
          <div className="min-w-32">{shortDate(post._createdAt)}</div>
          <div className="w-full md:w-2/3">
            <h3
              className="pb-2 text-white"
              style={{ viewTransitionName: `post-${post.slug?.current}` }}
            >
              {post?.title}
            </h3>
            <PortableText value={post?.overview} />
          </div>
        </div>
      </Link>
    </div>
  );
}
