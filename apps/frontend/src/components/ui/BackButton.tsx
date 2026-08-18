import { cn } from "#/lib/utils";
import { Button } from "@/components/ui/button";

export function BackButton({
  buttonText,
  className,
}: {
  buttonText?: string;
  className?: string;
}) {
  return (
    <Button
      className={cn(
        "bg-muted-foreground hover:bg-foreground uppercase font-heading",
        className,
      )}
    >
      {"<< "}
      {buttonText}
    </Button>
  );
}
