import { PortableText } from "@portabletext/react";
import type {
  ALL_BLOGS_QUERY_RESULT,
  ALL_SHOWCASES_QUERY_RESULT,
} from "@repo/shared";
import { Link } from "@tanstack/react-router";
import { shortDate } from "#/utils/dateFormatters";
import { LinkExternalInIcon } from "./icons/LinkExternalIcon";
import Tooltip from "./ui/Tooltip";

interface BlogCardProps {
  post:
    | ALL_BLOGS_QUERY_RESULT["items"][0]
    | ALL_SHOWCASES_QUERY_RESULT["items"][0];
}

export function BlogCard(props: BlogCardProps) {
  const { post } = props;
  const isExternalBlog =
    (post._type === "blog" && post.isExternalBlog) ?? false;

  if (!post) return null;

  const href =
    post._type === "showcase"
      ? `/showcase/${post.slug?.current}`
      : post.isExternalBlog
        ? (post.externalBlogUrl ?? "#")
        : `/blog-page/${post.slug?.current}`;

  return (
    <article className="border-t pb-4 first:mt-12 hover:cursor-pointer hover:bg-accent">
      <Link to={href}>
        <div className="flex flex-col pt-4 md:flex-row">
          <div className="min-w-32">{shortDate(post._createdAt)}</div>
          <div className="w-full md:w-2/3">
            <h3
              className="text-white"
              style={{ viewTransitionName: `post-${post.slug?.current}` }}
            >
              {isExternalBlog && (
                <Tooltip title="Ekstern lenke">
                  <LinkExternalInIcon className="mr-2 inline size-5 align-text-bottom" />
                </Tooltip>
              )}
              {post?.title}
            </h3>

            <PortableText value={post?.overview} />
          </div>
        </div>
      </Link>
    </article>
  );
}
