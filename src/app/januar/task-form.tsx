"use client"
import * as React from "react"
import { useState } from "react"
import { MonthIncome } from "@prisma/client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import TotalCard from "@/components/cards/total"
//Actions
import { createIncome, updateIncome } from "@/actions/income-actions"
import prisma from '@/lib/prisma';


export function IncomeForm({ monthIncome }: { monthIncome: MonthIncome }) {
    const [show, setShow] = useState("hidden")
    const handleShowForm = () => {
        show === "hidden" ? setShow("block") : setShow("hidden")
    }

    return (
        <div>
            {!monthIncome?.brutIncome ? <h2>Not income yet</h2> : null}
            <TotalCard brutIncome={monthIncome.brutIncome || 0} />
            <form id="form" className={show} action={!monthIncome ? createIncome : updateIncome}>
                <input type="hidden" name="id" value={monthIncome ? monthIncome.id : ""} />
                <input type="hidden" name="year" value={monthIncome ? monthIncome.year : "2024"} />
                <input type="hidden" name="month" value={monthIncome ? monthIncome.month : "januar"} />
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Januar 2024</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Income</Label>
                                <Input name="brutIncome" id="brutIncome" placeholder="Brut Income" defaultValue={monthIncome.brutIncome || 0} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    </CardFooter>
                </Card>
                <div className="flex justify-center items-center gap-x-4 mt-4">
                    <Button type="submit" className={show === "hidden" ? "hidden" : "block"} onClick={handleShowForm}>Update</Button>
                </div>
            </form>
            <Button variant={show === "hidden" ? "secondary" : "destructive"} onClick={handleShowForm}>{show === "hidden" ? "Add Income" : "Cancel"}</Button>

        </div >
    )

}
