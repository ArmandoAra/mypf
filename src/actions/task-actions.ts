"use server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";


export async function createTask(formData: FormData) {
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const priority = formData.get("priority")?.toString();

    if (!name || !description || !priority) {
        return;
    }

    const newTask = await prisma.task.create({
        data: {
            name,
            description,
            priority,
        },
    });

    redirect("/");
}

export async function updateTask(formData: FormData) {
    const taskId = formData.get("id")?.toString();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const priority = formData.get("priority")?.toString();

    if (!taskId || !name || !description || !priority) {
        return;
    }

    await prisma.task.update({
        where: {
            id: Number(taskId),
        },
        data: {
            name,
            description,
            priority,
        },
    });

    redirect("/");
}

export async function deleteTask(formData: FormData) {
    const taskId = formData.get("id")?.toString();
    if (!taskId) {
        return;
    }
    await prisma.task.delete({
        where: {
            id: Number(taskId),
        },
    });
    revalidatePath("/");
}