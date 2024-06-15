import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Stacked from "@/components/bars/Stacked";

export default function ResumeCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Resume 2024</CardTitle>
            </CardHeader>
            <CardContent>
                {/* <Stacked /> */}

            </CardContent>

            <CardFooter >

            </CardFooter>
        </Card>
    )
}