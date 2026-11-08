import { longDate, shortDate } from "@/utils/dateFormatters";

interface PublishedTimeProps {
  publishedAt: string;
  updatedAt: string;
}

export default function PublishedTime(props: PublishedTimeProps) {
  const { publishedAt, updatedAt } = props;
  const isSameDates = publishedAt === updatedAt;
  if (!publishedAt) return null;

  return (
    <p className="block py-4 font-heading text-xs text-yellow uppercase">
      PUBLISERT: <time dateTime={publishedAt}>{longDate(publishedAt)}</time>{" "}
      {updatedAt && !isSameDates && (
        <>
          (OPPDATERT: <time dateTime={updatedAt}>{shortDate(updatedAt)}</time> )
        </>
      )}
    </p>
  );
}
