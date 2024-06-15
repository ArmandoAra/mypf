import React from 'react';



export default function SpendContainer({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className="flex flex-col gap-4 mt-24 w-full items-center hidden">
            {children}
        </div>
    );
}
