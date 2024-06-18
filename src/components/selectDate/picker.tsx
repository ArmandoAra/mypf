
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const actualDate = new Date()
const actualYear = actualDate.getFullYear()
const actualNumberMonth = actualDate.getMonth()

switch (actualNumberMonth) {
  case 0:
    var actualMonth = "January"
    break
  case 1:
    var actualMonth = "February"
    break
  case 2:
    var actualMonth = "March"
    break
  case 3:
    var actualMonth = "April"
    break
  case 4:
    var actualMonth = "May"
    break
  case 5:
    var actualMonth = "June"
    break
  case 6:
    var actualMonth = "July"
    break
  case 7:
    var actualMonth = "August"
    break
  case 8:
    var actualMonth = "September"
    break
  case 9:
    var actualMonth = "October"
    break
  case 10:
    var actualMonth = "November"
    break
  case 11:
    var actualMonth = "December"
    break
}

const FormSchema = z.object({
  month: z
    .string(),
  year: z
    .string(),
})

export function SelectMonthPage() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const protocol = window.location.protocol; // 'http:' o 'https:'
    const host = window.location.host;
    // Construir la URL absoluta
    const absoluteUrl = `${protocol}//${host}/year/${data.year}/${data.month}`;

    // Redireccionar a la URL absoluta
    document.location.href = absoluteUrl;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row mx-5 gap-x-3">

        <Button type="submit">Go to</Button>
        <FormField
          control={form.control}
          name="month"
          defaultValue={actualMonth}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="Februar">Februar</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                  <SelectItem value="November">November</SelectItem>
                  <SelectItem value="December">December</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          defaultValue={actualYear.toString()}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

      </form>
    </Form>
  )
}
