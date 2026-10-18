import { Link, useCanGoBack, useRouter } from "@tanstack/react-router";
import { cn } from "#/lib/utils";
import { Button } from "@/components/ui/button";

export function BackButton({
  buttonText,
  className,
}: {
  buttonText?: string;
  className?: string;
}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <Button
      asChild
      className={cn(
        "bg-muted-foreground hover:bg-foreground uppercase font-heading no-underline",
        className,
      )}
    >
      <Link
        to=".."
        onClick={(e) => {
          if (canGoBack) {
            e.preventDefault();
            router.history.back();
          }
        }}
      >
        {"<< "}
        {buttonText}
      </Link>
    </Button>
  );
}
