"use client"
import React, { use, useEffect, useMemo } from 'react'
import Link from 'next/link'
import dinamic from 'next/dynamic'
import { useState } from 'react'

// components
import { ModeToggle } from '../buttons/theme-toggle-button'


// ui components
import { Button, buttonVariants } from '../ui/button'
import { SelectMonthPage } from '../selectDate/picker'

const NavBar = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const protocol = window.location.protocol; // 'http:' o 'https:'
    const host = window.location.host;
    const curretUrl = window.location.href;
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(e.target.value))
    }

    const handleClick = () => {
        // Construir la URL absoluta
        const absoluteUrl = `./year/${year}`;

        // Redireccionar a la URL absoluta
        document.location.href = absoluteUrl;
    }



    return (
        <nav className='flex flex-col sm:flex-row justify-center items-center h-32 sm:h-16 bg-black w-screen fixed z-50'>
            <div className='flex flex-row gap-2 m-4'>
                <Button onClick={handleClick} >Resume : </Button>
                {year && <select title='yearSelector' value={year} className='bg-gray-800 rounded-md text-center' onChange={handleYearChange}>

                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
                }
            </div>
            <div className='flex xl:gap-x-44 '>
                <Link className={buttonVariants({ variant: "secondary" })} href='/'>Home</Link>
                <SelectMonthPage />
                <ModeToggle />
            </div>
        </nav>
    )
}

export default dinamic(() => Promise.resolve(NavBar), { ssr: false });

