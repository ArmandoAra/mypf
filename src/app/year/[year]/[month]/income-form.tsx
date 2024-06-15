"use server"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import TotalCard from "@/components/cards/total"
//Actions
import { getIncomeData, updateIncome } from "@/actions/income-actions"

//Styles
import "./styles.css"
import { Year } from '@prisma/client';


export async function IncomeForm({ year, month, totalSpends }: { year: string, month: string, totalSpends: number }) {

    const monthIncome = await getIncomeData(year, month)

    const show = "block"

    return (
        <div className="column">
            <TotalCard brutIncome={monthIncome?.brutIncome || 0} totalSpends={totalSpends} year={year} month={month} />
            <form id="form" className={show} action={updateIncome}>
                <input type="hidden" name="id" value={monthIncome?.id} />
                <input type="hidden" name="currentYear" value={year} />
                <input type="hidden" name="currentMonth" value={month} />
                <Card className="w-[350px]">
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Income</Label>
                                <Input name="brutIncome" id="brutIncome" placeholder="Brut Income" defaultValue={monthIncome?.brutIncome || 0} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" className="block">Update Income</Button>
                    </CardFooter>
                </Card>

            </form>

        </div >
    )

}
