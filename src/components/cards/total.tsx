import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalize } from '../utils/text';

// parseFloat(total.toFixed(2))

export default async function TotalCard({ brutIncome, totalSpends, year, month }: { year: string, month: string, brutIncome: number, totalSpends: number }) {

    const umst = (brutIncome * 0.19).toFixed(2);
    const net = (brutIncome * 0.81).toFixed(2);
    const total = parseFloat(net) - parseFloat(totalSpends.toFixed(2));

    return (

        < Card className='w-full'>
            <CardHeader>
                <CardTitle>Total of the {capitalize(month)}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-auto">Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className='bg-green-800'>
                            <TableCell className="font-medium">Brut</TableCell>
                            <TableCell className="text-right">{brutIncome} €</TableCell>
                        </TableRow>
                        <TableRow className='bg-green-800'>
                            <TableCell className="font-medium">Neto</TableCell>
                            <TableCell className="text-right">{net} €</TableCell>
                        </TableRow>
                        <TableRow className='bg-red-800' >
                            <TableCell className="font-medium">Spend</TableCell>
                            <TableCell className="text-right">{totalSpends} €</TableCell>
                        </TableRow>
                        <TableRow className='bg-blue-800'>
                            <TableCell className="font-medium">Umst.</TableCell>
                            <TableCell className="text-right">{umst} €</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

            </CardContent>


            <div className='flex flex-row justify-evenly gap-10 mb-5'>
                <h3 className="font-medium">Total</h3>
                <h4 className="text-right">{total} €</h4>
            </div>

        </ Card>

    )
}


