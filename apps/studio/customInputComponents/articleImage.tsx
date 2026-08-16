import type { BlockProps, RenderPreviewCallbackProps } from "sanity";

/**
 * Renders a large articleImage instead of the default tiny thumbnail
 */
export function ArticleImage(props: BlockProps) {
  const { renderDefault, renderPreview } = props;

  const renderBlockImagePreview = (previewProps: RenderPreviewCallbackProps) =>
    renderPreview({
      ...previewProps,
      layout: "blockImage",
    });

  return renderDefault({ ...props, renderPreview: renderBlockImagePreview });
}
