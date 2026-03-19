import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const ProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    notFound();
  }

  return (<div>{project?.title}</div>);
};

export default ProjectPage;
