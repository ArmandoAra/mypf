import React, { use, useEffect } from 'react'
import { IncomeForm } from './task-form';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import TaskCard from '@/components/cards/task-card';
import dinamic from 'next/dynamic';
import Spend from '@/components/cards/spend';
import { createIncome } from '@/actions/income-actions';

const initialData = new FormData()

async function Page() {

    useEffect(() => {
        createIncome(initialData)
    }, [])


    return (
        <div className='flex flex-col  md:flex-row  md:justify-around'>
            <IncomeForm } />
            <Spend />
        </div>
    )
}



export default dinamic(() => Promise.resolve(Page), { ssr: false });
