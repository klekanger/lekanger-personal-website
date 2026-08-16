import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  page: number;
  isLastPage: boolean;
}

export function PaginationComponent({
  page,
  isLastPage,
}: PaginationComponentProps) {
  return (
    <Pagination className="pt-8">
      <PaginationContent>
        {page !== 1 ? (
          <PaginationItem className="font-heading text-2xl">
            <PaginationPrevious
              to="."
              search={{ page: page - 1 }}
              text="Forrige"
              className="font-heading text-2xl hover:bg-foreground hover:text-background"
            />
          </PaginationItem>
        ) : null}
        {!isLastPage && page !== 1 ? <PaginationEllipsis /> : null}
        {!isLastPage ? (
          <PaginationItem>
            <PaginationNext
              to="."
              search={{ page: page + 1 }}
              text="Neste"
              className="font-heading text-2xl hover:bg-foreground hover:text-background"
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
