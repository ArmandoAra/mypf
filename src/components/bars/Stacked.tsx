"use client"
import React from 'react'




// Ejemplo de uso del componente con las propiedades tipadas
export default function Stacked() {
    return (

        <BarChart
            xAxis={[
                {
                    id: 'barCategories',
                    data: ['bar A', 'bar B', 'bar C'],
                    scaleType: 'band',
                },
            ]}
            series={[
                {
                    data: [2, 5, 3],
                },
            ]}
            width={500}
            height={300}
        />
    );
}
