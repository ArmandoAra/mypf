import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalize } from '../utils/text';
import { getAllIncomes } from '@/actions/income-actions';
import { getAllSpends } from '@/actions/spend-actions';
import TotalCard from '@/components/cards/total';

// parseFloat(total.toFixed(2))

export default async function HomeTotalCard({
    year, totalBruIncome,
    totalNetIncome,
    totalSpend,
    totalUmst,
    total }: {
        year: number,
        totalBruIncome: number,
        totalNetIncome: number,
        totalSpend: number,
        totalUmst: number,
        total: number
    }) {

    return (

        < Card >
            <CardHeader>
                <CardTitle>Total of the {year}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className='bg-green-800'>
                            <TableCell className="font-medium">Brut</TableCell>
                            <TableCell className="text-right">{totalBruIncome} €</TableCell>
                        </TableRow>
                        <TableRow className='bg-green-800'>
                            <TableCell className="font-medium">Neto</TableCell>
                            <TableCell className="text-right">{totalNetIncome} €</TableCell>
                        </TableRow>
                        <TableRow className='bg-red-800' >
                            <TableCell className="font-medium">Spend</TableCell>
                            <TableCell className="text-right">{totalSpend} €</TableCell>
                        </TableRow>
                        <TableRow className='bg-blue-800'>
                            <TableCell className="font-medium">Umst.</TableCell>
                            <TableCell className="text-right">{totalUmst} €</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </CardContent>


            <div className='flex flex-row justify-evenly gap-10 mb-5'>
                <h3 className="font-medium">Total</h3>
                <h4 className="text-right">{total.toFixed(2)} €</h4>
            </div>

        </ Card>

    )
}


