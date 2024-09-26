"use client"

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const sessionPro = ({ children }: { children: React.ReactNode }) => {

    return (

        <SessionProvider>
            
            {children}

            <ProgressBar
                height="4px"
                color="#09790a"
                options={{ showSpinner: false }}
                shallowRouting
            />

        </SessionProvider>
    )

}

export default sessionPro