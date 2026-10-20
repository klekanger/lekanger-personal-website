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
    <section className="font-heading py-8">
      {github && (
        <span className="inline-flex items-center gap-2">
          <GitHubIcon className="size-7" />
          <a href={github}>GitHub</a>
        </span>
      )}
      <br />
      {projectUrl && (
        <span className="inline-flex items-center gap-2">
          <LinkIcon className="size-7" />
          <a href={projectUrl}>{projectText} </a>
        </span>
      )}
    </section>
  );
}
