import React from 'react'
import { createSpend } from '@/actions/spend-actions'
import { Button } from '@/components/ui/button'
import { getIncomeData } from '@/actions/income-actions'

//Styles
import "./styles.css";

export default async function SpendForm({ year, month }: { year: string, month: string }) {

    const monthIncome = await getIncomeData(year, month)


    return (

        <form id="form" className="column" action={createSpend}>
            <div className='flex flex-col gap-2 mb-4 p-4'>
                <label htmlFor="service" className='flex flex-row justify-between gap-1 my-1'>Service <input className='text-right pr-2' type="text" name="service" /></label>
                <label htmlFor="amount" className='flex flex-row justify-between gap-1 my-1'>Amount <input className='text-right pr-2 appearance-none' type="number" step="0.01" min="0" placeholder="0.00" required name="amount" /></label>
                <label htmlFor="type" className='flex flex-row justify-between gap-1 my-1'>Type <input className='text-right pr-2' type="text" name="type" /></label>
                <label htmlFor="description" className='flex flex-col justify-between gap-2 my-4'>Description <textarea id="multiline-text" name="description" rows={5} cols={50}></textarea></label>
                <label htmlFor="date" className='flex flex-row justify-between gap-1 my-1'>Date<input type="date" name="date" />
                </label>
                <input type="hidden" name="monthId" value={monthIncome?.id} />
                <input type="hidden" name="year" value={year} />
                <input type="hidden" name="month" value={month} />
                <Button type="submit">Add Spend</Button>
            </div>
        </form>

    )
}

