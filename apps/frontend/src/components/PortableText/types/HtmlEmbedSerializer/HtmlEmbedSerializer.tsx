import type { PortableTextTypeComponentProps } from "@portabletext/react";
import type { PortableTextValueOfType } from "../../componentTypes";

export const HtmlEmbedSerializer = ({
  value,
}: PortableTextTypeComponentProps<PortableTextValueOfType<"htmlEmbed">>) => {
  const { code } = value;

  if (!code) return null;

  return (
    <div>
      <iframe
        title="embedded html"
        srcDoc={value.code}
        style={{
          width: "100%",
          height: "850px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#fbfbfb",
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};
