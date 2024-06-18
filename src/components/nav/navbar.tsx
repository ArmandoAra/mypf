import React from 'react'
import Link from 'next/link'
import dinamic from 'next/dynamic'

// components
import { ModeToggle } from '../buttons/theme-toggle-button'


// ui components
import { buttonVariants } from '../ui/button'
import { SelectMonthPage } from '../selectDate/picker'

const NavBar = () => {
    return (
        <nav className='flex justify-center items-center h-16 bg-black w-screen fixed z-50'>
            <div className='flex md:gap-x-44 '>
                <Link className={buttonVariants({ variant: "secondary" })} href='/'>Home</Link>
                <SelectMonthPage />
                <ModeToggle />
            </div>
        </nav>
    )
}

export default dinamic(() => Promise.resolve(NavBar), { ssr: false });

