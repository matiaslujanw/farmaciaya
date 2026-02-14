'use client'

import React from 'react'
import Image from 'next/image'

export function BackgroundWrapper() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden">
            <Image
                src="/fondo.png"
                alt="Background"
                fill
                quality={100}
                priority
                className="object-cover blur-[1px] opacity-80"
            />
            <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />
        </div>
    )
}
