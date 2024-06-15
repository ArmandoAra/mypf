"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import navigate from "next/navigation";
import spend from '@prisma/client';

export async function getSpend({ year, month, id }: { year: string, month: string, id: string }) {
    try {
        const existYear = await prisma.year.findFirst({
            where: {
                year: Number(year),
            },
        });

        if (!existYear) {
            console.log("No year found");
            return null;
        }

        const existMonth = await prisma.month.findFirst({
            where: {
                yearId: existYear.id,
                month: month,
            },
        });

        if (!existMonth) {
            console.log("No month found");
            return null;
        }

        const spend = await prisma.spend.findFirst({
            where: {
                id: Number(id),
            },
        });

        return spend;

    } catch (error) {
        console.error("Error fetching spend:", error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

export async function getSpends({ year, month }: { year: string, month: string }) {
    try {
        // Buscar si existe el año
        const existYear = await prisma.year.findFirst({
            where: {
                year: Number(year),
            },
        });

        if (!existYear) {
            console.log("No year found");
            return [];
        }

        // Buscar si existe el mes en el año encontrado
        const existMonth = await prisma.month.findFirst({
            where: {
                yearId: existYear.id,
                month: month,
            },
        });

        if (!existMonth) {
            console.log("No month found");
            return [];
        }

        // Buscar los spends del mes encontrado
        const spends = await prisma.spend.findMany({
            where: {
                monthId: existMonth.id,
            },
        });

        return spends;

    } catch (error) {
        console.error("Error fetching spends:", error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}

export async function getAllSpends({ year, months }: { year: string, months: string[] }) {
    // Buscar y sumar todos los gastos de un año
    try {
        const existYear = await prisma.year.findFirst({
            where: {
                year: Number(year),
            },
        });

        if (!existYear) {
            console.log("No year found");
            return [];
        }

        const allSpends = await prisma.spend.findMany({
            where: {
                month: {
                    yearId: existYear.id,
                    month: {
                        in: months,
                    },
                },
            },
        });

        return allSpends.reduce((acc, spend) => {
            acc += spend.amount || 0;
            return acc;
        }, 0);


    } catch (error) {
        console.error("Error fetching all spends:", error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}

export async function getSpendTypes() {
    try {
        const spendTypes = await prisma.spend.findMany();

        // Retornar solo los tipos de spend
        const types = spendTypes.map((spend) => spend.type);
        // Filtrar los tipos duplicados
        if (!types) {
            return [];
        }
        const uniqueTypes = types.filter((item, index) => types.indexOf(item) === index);
        return uniqueTypes;

    } catch (error) {
        console.error("Error fetching spend types:", error);
        return [];
    } finally {
        await prisma.$disconnect();
    }
}
export async function createSpend(formData: FormData) {
    try {
        const monthId = Number(formData.get("monthId"));

        const service = formData.get("service") as string;
        const amount = Number(formData.get("amount"));
        const type = formData.get("type") as string;
        const description = formData.get("description") as string;

        const year = formData.get("year") as string;
        const month = formData.get("month") as string;

        const date = formData.get("date") as string || new Date().toISOString();

        await prisma.spend.create({
            data: {
                monthId,
                service,
                amount,
                type,
                description,
                createdAt: new Date(date),
            },
        });

        revalidatePath(`/year/${year}/${month}`);

    } catch (error) {
        console.error("Error creating spend:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function updateSpend(formData: FormData) {

    try {
        const id = Number(formData.get("id"));
        const service = formData.get("service") as string;
        const amount = Number(formData.get("amount"));
        const type = formData.get("type") as string;
        const description = formData.get("description") as string;

        const year = formData.get("year") as string;
        const month = formData.get("month") as string;
        const date = formData.get("date") as string || new Date().toISOString();
        await prisma.spend.update({
            where: {
                id,
            },
            data: {
                service,
                amount,
                type,
                description,
                createdAt: new Date(date),
            },
        });

        window.location.href = `/year/${year}/${month}`;

    } catch (error) {
        console.error("Error updating spend:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteSpend(formData: FormData) {
    const id = formData.get("id");
    const year = formData.get("year");
    const month = formData.get("month");

    if (!id) {
        return;
    }

    try {
        await prisma.spend.delete({
            where: {
                id: Number(id)
            },
        });

    } catch (error) {
        console.error("Error deleting spend:", error);
    } finally {
        await prisma.$disconnect();
    }
    revalidatePath(`/year/${year}/${month}`)
}