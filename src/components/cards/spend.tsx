import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import SpendButtonDelete from '../buttons/spend-button-delete'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
interface Spends {
    id: number;
    monthId: number;
    service: string | null;
    amount: number | null;
    type: string | null;
    description: string | null;
    createdAt: Date | null;
}

export default function SpendCard({ spends, year, month }: { spends: Spends[], year: string, month: string }) {
    // tuple of all spends types
    const spendsTypes = new Set(spends.map((spend) => spend.type))
    const spendTypes = Array.from(spendsTypes)


    //Imprimir el día, mes, y año de creación de la primera factura
    function formatDate(date: Spends) {
        let day = date.createdAt?.getDate()
        let month = date.createdAt?.getMonth()
        let year = date.createdAt?.getFullYear()
        return `${day}/${month}/${year}`;
    }
    async function calcAllSpends(spends: Spends[]) {
        let result = 0;

        spends.map((spend) => {
            result += spend.amount || 0;
        })

        return parseFloat(result.toFixed(2));
    }
    let totalSpends = calcAllSpends(spends)

    return (
        <Table className='w-2/4'>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Spend</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead >Amount</TableHead>
                    <TableHead >Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=''>
                {spendTypes.map((spendType, index) => (
                    spends.map((spend, index) => (
                        spend.type === spendType ?
                            <TableRow key={index}>
                                <TableCell  >{spend.service}</TableCell>
                                <TableCell >{formatDate(spend)}</TableCell>
                                <TableCell className='text-right' >{spend.amount} €</TableCell>
                                <TableCell ><Badge>{spend.type}</Badge></TableCell>
                                <TableCell className='flex flex-row align-middle gap-4'>
                                    <Link href={`/year/${year}/${month}/${spend.id}/edit`}><Button>Edit</Button></Link>
                                    <SpendButtonDelete spendId={spend.id} year={year} month={month} />
                                </TableCell>
                            </TableRow>
                            : null
                    ))
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell>- {totalSpends} €</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}


