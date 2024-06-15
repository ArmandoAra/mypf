import prisma from "@/lib/prisma";
import TaskCard from "@/components/cards/task-card";
import TotalCard from "@/components/cards/total";
import ResumeCard from "@/components/cards/resume";
import dinamic from "next/dynamic";

async function Home() {

  return (
    <div className="flex flex-col w-screen items-center " >
      <h1 className="text-4xl font-bold text-center">
        My Personal Finance
      </h1>
      <TotalCard />
    </div>

  );
}

export default dinamic(() => Promise.resolve(Home), { ssr: false });