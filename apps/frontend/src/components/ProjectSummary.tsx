import { GitHubIcon } from "./icons/GitHubIcon";
import { LinkIcon } from "./icons/LinkIcon";

interface ProjectSummaryProps {
  github?: string | null;
  projectUrl?: string | null;
  projectText?: string | null;
}

export default function ProjectSummary(props: ProjectSummaryProps) {
  const { github, projectUrl, projectText = "Les mer" } = props;

  return (
    <section className="py-8 font-heading">
      {github && (
        <span>
          <a href={github} className="flex gap-x-2">
            <GitHubIcon className="size-7 text-foreground" />
            GitHub
          </a>
        </span>
      )}
      {projectUrl && (
        <span>
          <a href={projectUrl} className="flex gap-2">
            <LinkIcon className="size-7 text-foreground" />
            {projectText}
          </a>
        </span>
      )}
    </section>
  );
}
