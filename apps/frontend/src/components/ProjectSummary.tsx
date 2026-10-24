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
    <ul
      className="list-none py-8 pl-0 font-heading"
      aria-label="Relevante lenker"
    >
      {github && (
        <li>
          <a href={github} className="flex gap-x-2">
            <GitHubIcon className="size-7 text-foreground" />
            GitHub
          </a>
        </li>
      )}
      {projectUrl && (
        <li>
          <a href={projectUrl} className="flex gap-2">
            <LinkIcon className="size-7 text-foreground" />
            {projectText}
          </a>
        </li>
      )}
    </ul>
  );
}
