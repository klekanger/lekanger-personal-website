import { longDate, shortDate } from "@/utils/dateFormatters";

interface PublishedTimeProps {
  _createdAt: string;
  _updatedAt?: string;
}

export default function PublishedTime(props: PublishedTimeProps) {
  const { _createdAt, _updatedAt } = props;
  if (!_createdAt) return null;

  return (
    <p className="block py-4 font-heading text-xs text-yellow">
      PUBLISERT:{" "}
      <time dateTime={_createdAt}>{longDate(_createdAt).toUpperCase()}</time>{" "}
      {_updatedAt && (
        <>
          (OPPDATERT: <time dateTime={_updatedAt}>{shortDate(_updatedAt)}</time>{" "}
          )
        </>
      )}
    </p>
  );
}
