import React from 'react'
import { CardWithForm } from './task-form';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import TaskCard from '@/components/cards/task-card';

async function Page() {
    const tasks = await prisma.task.findMany()

    if (!tasks) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1>No tasks found</h1>
            </div>
        )
    }
    else {

        return (
            <div className='flex justify-center items-center h-screen'>
                {tasks.map((task) => (
                    <TaskCard task={task} key={task.id} />
                ))}
                <CardWithForm />
            </div>
        )
    }
}

export default Page;
