"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function createIncome({ year, month }: { year: string, month: string }) {

    //buscar si existe el mes que esta en el año
    const existYear = await prisma.year.findFirst({
        where: {
            year: Number(year),
        },
    });

    if (!existYear) {
        // si no existe el año se crea
        const yearIncome = await prisma.year.create({
            data: {
                year: Number(year),
            },
        });
        //se crea el mes
        const monthIncome = await prisma.month.create({
            data: {
                month,
                yearId: yearIncome.id,
                brutIncome: 0
            },
        });
    } else {
        const existMonth = await prisma.month.findFirst({
            where: {
                yearId: existYear.id,
                month: month,
            },
        });

        if (!existMonth) {
            const monthIncome = await prisma.month.create({
                data: {
                    month,
                    yearId: existYear.id,
                    brutIncome: 0
                },
            });
            console.log("monthIncome created")
        }
    }

}

export async function getIncomeData(year: string, month: string) {
    const existIncome = await prisma.year.findFirst({
        where: {
            year: Number(year),
        },
    });
    if (!existIncome) {
        return null;
    }
    const existMonth = await prisma.month.findFirst({
        where: {
            yearId: existIncome.id,
            month: month,
        },
    });
    return existMonth;
}

export async function updateIncome(formData: FormData) {
    const monthId = formData.get("id")?.toString();
    const brutIncome = formData.get("brutIncome")?.toString();
    const currentYear = formData.get("currentYear")?.toString();
    const currentMonth = formData.get("currentMonth")?.toString();

    if (!monthId || !brutIncome) {
        return;
    }

    await prisma.month.update({
        where: {
            id: Number(monthId),
        },
        data: {
            brutIncome: Number(brutIncome),
        },
    });

    revalidatePath(`/year/${currentYear}/${currentMonth}`);

}

export async function getAllIncomes(year: string) {
    const existIncome = await prisma.year.findFirst({
        where: {
            year: Number(year),
        },
    });

    if (!existIncome) {
        return null;
    }

    const allIncomes = await prisma.month.findMany({
        where: {
            yearId: existIncome.id
        }
    });

    return allIncomes;
}