
import { getSpend, getSpendTypes, updateSpend } from "@/actions/spend-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";


async function SpendEdit({ params }: { params: { month: string, year: string, id: string } }) {
    const id = params.id;
    const year = params.year;
    const month = params.month;

    const spend = await getSpend({ year: year, month: month, id: id });
    const spendTypes = await getSpendTypes();


    return (
        <form action={updateSpend} className="mt-28 w-4/5 md:w-2/6 ">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="year" value={year} />
            <input type="hidden" name="month" value={month} />
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Update Spend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5 ">
                            <Label >Service</Label>
                            <Input name="service" id="service" placeholder="Service" defaultValue={spend?.service || ""} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label >Amount</Label>
                            <Input name="amount" id="amount" type="number" step="0.01" min="0" placeholder="0.00" defaultValue={spend?.amount || ""} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label >Description</Label>
                            <Textarea name="description" id="description" placeholder="Description of your project" defaultValue={spend?.description || ""} />
                        </div>

                        <Label htmlFor="priority">Type</Label>
                        <Select name="type" defaultValue={spend?.type || "Oters"} >
                            <SelectTrigger id="type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {spendTypes?.map((type, index) => (
                                    <SelectItem key={index} value={type || "Other"}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Label htmlFor="date">Date</Label>
                        <Input className="flex flex-col items-center" type="date" name="date" id="date" defaultValue={spend?.createdAt?.toISOString().split('T')[0]} />
                        <Link className={buttonVariants({ variant: "destructive" })} href={`/year/${year}/${month}`
                        }>Cancel</Link>
                        <Button type="submit">Update Spend</Button>

                    </div>
                </CardContent>

            </Card>
        </form>
    )
}

export default SpendEdit;
