
import dinamic from "next/dynamic";

import HomeTotalCard from "@/components/cards/homeTotal";
import { calcTotalYear } from "@/components/utils/calculate";
import BarChart from "@/components/bars/BarChart";
import { getListMonthIncomes } from "@/actions/income-actions";
import { getMonthSpends } from "@/actions/spend-actions";

export default async function Year({ params }: { params: { year: string } }) {

    const selectedYear = Number(params.year || new Date().getFullYear());
    const data = await calcTotalYear(selectedYear);
    const monthsIncomes = await getListMonthIncomes(selectedYear.toString()) || [];
    const monthsSpends = await getMonthSpends(selectedYear.toString());

    return (

        <section className="" >
            <div className="mt-40">
                <h1 className="text-7xl font-bold my-10 ml-11">
                    My Personal Finance <span className="bg-blue-900">{selectedYear}</span>
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
