"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SpendButtonDelete from '@/components/buttons/spend-button-delete';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Spends {
    id: number;
    monthId: number;
    service: string;
    amount: number;
    type: string;
    description: string;
    createdAt: Date;
}

interface SpendCardProps {
    spends: Spends[];
    year: string;
    month: string;
}

const SpendCard: React.FC<SpendCardProps> = ({ spends, year, month }) => {
    const [selectedFruit, setSelectedFruit] = useState<string>('All');
    const [filteredSpends, setFilteredSpends] = useState<Spends[]>(spends);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFruit(event.target.value);
    };

    useEffect(() => {
        if (selectedFruit === 'All') {
            setFilteredSpends(spends);
        } else {
            setFilteredSpends(spends.filter(spend => spend.type === selectedFruit));
        }
    }, [selectedFruit, spends]);

    // tuple of All spends types
    const spendsTypes = new Set(spends.map((spend) => spend.type));
    const spendTypes = Array.from(spendsTypes);
    spendTypes.push('All');

    const formatDate = (date: Spends) => {
        const day = date.createdAt?.getDate();
        const month = date.createdAt?.getMonth() + 1; // Añadir 1 porque los meses en JS son base 0
        const year = date.createdAt?.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calcTotalSpends = (spends: Spends[]) => {
        return spends.reduce((total, spend) => total + (spend.amount || 0), 0).toFixed(2);
    };

    const totalSpends = calcTotalSpends(filteredSpends);

    return (
        <section className='flex flex-col gap-4 mt-24 w-full items-center'>
            {/* select type of spend */}
            <div className='flex w-full justify-end gap-6 '>
                <label htmlFor="sort"><h2 className='text-2xl'>Sort by: </h2></label>
                <select id="sort" value={selectedFruit} onChange={handleChange}>
                    {spendTypes.map((spendType, index) => (
                        <option className='text-xl w-14' key={index} value={spendType}>{spendType}</option>
                    ))}
                </select>
            </div>

            <Table className='column'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Spend</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredSpends.map((spend, index) => (
                        <TableRow key={index}>
                            <TableCell>{spend.service}</TableCell>
                            <TableCell>{formatDate(spend)}</TableCell>
                            <TableCell className='text-right'>{spend.amount} €</TableCell>
                            <TableCell><Badge>{spend.type}</Badge></TableCell>
                            <TableCell className='flex flex-row align-middle gap-4'>
                                <Link href={`/year/${year}/${month}/${spend.id}/edit`}><Button>Edit</Button></Link>
                                <SpendButtonDelete spendId={Number(spend.id)} year={year} month={month} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell>- {totalSpends} €</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </section>
    );
};

export default SpendCard;
