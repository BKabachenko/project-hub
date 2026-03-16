import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const newTenProjects = await prisma.project.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <p>Latest 10 projects</p>
      {newTenProjects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <div className="block mb-2">
            <div className="">
              <div className="">Title - {project.title}</div>
              <div className="">Description - {project.description}</div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
