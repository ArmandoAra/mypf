
import dinamic from "next/dynamic";

import HomeTotalCard from "@/components/cards/homeTotal";
import { calcTotalYear } from "@/components/utils/calculate";
import BarChart from "@/components/bars/BarChart";
import { getListMonthIncomes } from "@/actions/income-actions";
import { getMonthSpends } from "@/actions/spend-actions";
async function Home() {

  const selectedYear = new Date().getFullYear();
  const data = await calcTotalYear(selectedYear);
  const monthsIncomes = await getListMonthIncomes(selectedYear.toString()) || [];
  const monthsSpends = await getMonthSpends(selectedYear.toString());

  return (

    <section className="" >
      <div className="mt-40">
        <h1 className="text-7xl font-bold my-10 ml-11">
          My Personal Finance {selectedYear}
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 ">
        <div className="p-8 ">
          <HomeTotalCard
            year={selectedYear}
            totalBruIncome={data?.totalBruIncome || 0}
            totalNetIncome={data?.totalNetIncome || 0}
            totalSpend={Number(data?.totalSpend) || 0}
            totalUmst={data?.totalUmst || 0}
            total={data?.total || 0}
          />
        </div>
        <div className="flex lg:w-2/3 xl:w-5/6 items-center p-6">
          <BarChart incomes={monthsIncomes} expenses={monthsSpends} />
        </div>
      </div>
    </section>
  );
}

export default dinamic(() => Promise.resolve(Home), { ssr: false });
