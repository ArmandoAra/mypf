import { CardWithForm } from '@/app/new/task-form';
import prisma from '@/lib/prisma';
import { Task } from '@prisma/client';
import { redirect } from 'next/navigation';


export default async function TaskPageEdit({ params }: { params: { id: string } }) {
    const task = await prisma.task.findFirst({
        where: {
            id: Number(params.id)
        }
    })

    if (!task) {
        redirect('/')
    }

    return (
        <>
            <CardWithForm task={task} />
        </>
    )
}


