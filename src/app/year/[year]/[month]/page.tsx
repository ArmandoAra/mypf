
import { createIncome } from '@/actions/income-actions';
import { IncomeForm } from './income-form';
import SpendForm from './spend-form';
import { createSpend, getSpends } from '@/actions/spend-actions';

//styles
import "./styles.css";

// utils
import { sum } from '@/components/utils/calculate';
import SpendCard from './spend';
import { Button } from '@/components/ui/button';
import SpendContainer from '@/app/container/spendsContainer';
import { capitalize } from '@/components/utils/text';

interface Spends {
    id: number;
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;
}


export default async function Month({ params }: { params: { month: string, year: string } }) {
    const year = params.year;
    const month = params.month;

    createIncome({ year, month })
    const spends = await getSpends({ year, month })

    async function calcAllSpends(spends: Spends[]) {
        let result = 0;

        spends.map((spend) => {
            result += spend.amount || 0;
        })

        return parseFloat(result.toFixed(2));
    }

    const totalSpends = await calcAllSpends(spends as Spends[])

    return (
        <section className="flex flex-col gap-4 mt-1 w-full items-center">
            <h1 className='text-7xl font-medium '>{capitalize(params.month)} {params.year}</h1>
            <div className='monthContainer mt-5'>
                <IncomeForm year={params.year} month={params.month} totalSpends={totalSpends} />
                <SpendCard spends={spends as Spends[]} year={year} month={month} />
                <SpendForm year={year} month={month} />
            </div>

        </section>
    )
}

