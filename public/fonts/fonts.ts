import { Sacramento, Roboto, Lobster_Two, Acme } from 'next/font/google'


// for logo
export const logo_font = Sacramento({
    display: 'swap',
    subsets: ['latin'],
    weight: '400'
})


// for whole display
export const screen_font = Roboto({
    weight: '400',
    display: 'swap',
    subsets: ['latin']
})


// for Headings

export const heading_font = Lobster_Two({
    weight: '700',
    display: 'swap',
    subsets: ['latin']
})


export const banner_heading = Acme({
    weight: '400',
    display: 'swap',
    subsets: ['latin']
})