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
  headingAs?: "h2" | "h3";
}

export function BlogCard(props: BlogCardProps) {
  const { post, headingAs: HeadingTag = "h2" } = props;

  if (!post) return null;

  const isExternalBlog =
    (post._type === "blog" && post.isExternalBlog) ?? false;

  const href =
    post._type === "showcase"
      ? `/showcase/${post.slug?.current}`
      : post.isExternalBlog
        ? (post.externalBlogUrl ?? "#")
        : `/blog-page/${post.slug?.current}`;

  return (
    <article className="relative border-t pb-4 hover:cursor-pointer hover:bg-accent">
      <div className="flex flex-col pt-4 md:flex-row">
        <time dateTime={post._createdAt} className="min-w-32">
          {shortDate(post._createdAt)}
        </time>
        <div className="w-full md:w-2/3">
          <HeadingTag
            className="text-white"
            style={{ viewTransitionName: `post-${post.slug?.current}` }}
          >
            <Link to={href} className="after:absolute after:inset-0">
              {isExternalBlog && (
                <span className="relative z-10">
                  <Tooltip title="Ekstern lenke">
                    <LinkExternalInIcon className="mr-2 inline size-5 align-text-bottom" />
                  </Tooltip>
                </span>
              )}
              {post.title}
            </Link>
          </HeadingTag>

          <PortableText value={post.overview} />
        </div>
      </div>
    </article>
  );
}
