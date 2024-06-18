import prisma from "@/lib/prisma";
import TaskCard from "@/components/cards/task-card";
import TotalCard from "@/components/cards/total";
import ResumeCard from "@/components/cards/resume";
import dinamic from "next/dynamic";
//styles
import "../app/styles.css";
import HomeTotalCard from "@/components/cards/homeTotal";
import { calcTotalYear } from "@/components/utils/calculate";
import BarChart from "@/components/bars/BarChart";
import { getListMonthIncomes } from "@/actions/income-actions";
import { getMonthSpends } from "@/actions/spend-actions";
async function Home() {


  const selectedYear = 2024;
  const data = await calcTotalYear(selectedYear);
  const monthsIncomes = await getListMonthIncomes(selectedYear.toString()) || [];
  const monthsSpends = await getMonthSpends(selectedYear.toString());

  return (

    <section className="container mt-32 gap-y-14" >
      <div className="tile">
        <h1 className="text-7xl font-bold ">
          My Personal Finance
        </h1>
      </div>
      <div className="totalMonthsContainer gap-x-5">
        <div className="totalContainer">
          <HomeTotalCard
            year={selectedYear}
            totalBruIncome={data?.totalBruIncome || 0}
            totalNetIncome={data?.totalNetIncome || 0}
            totalSpend={Number(data?.totalSpend) || 0}
            totalUmst={data?.totalUmst || 0}
            total={data?.total || 0}
          />
        </div>
        <div className="monthsContainer p-4">
          <BarChart incomes={monthsIncomes} expenses={monthsSpends} />
        </div>
      </div>
    </section>
  );
}

export default dinamic(() => Promise.resolve(Home), { ssr: false });