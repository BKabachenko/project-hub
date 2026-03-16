import prisma from "@/lib/prisma";

const ProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  const { projectId } = await params;
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  return (<div>{project?.title}</div>);
};

export default ProjectPage;
