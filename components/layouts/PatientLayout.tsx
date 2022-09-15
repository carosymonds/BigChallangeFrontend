import { FC } from 'react';
import Head from 'next/head';
import SideMenu from '../ui/SideMenu';

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
    children: React.ReactNode;
}

export const PatientLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={pageDescription} />
            <meta name="og:title" content={title} />
            <meta name="og:description" content={pageDescription} />
        </Head> 

        <SideMenu/>

        <main className='ml-[25%]'>
            { children }
        </main>
    </>
  )
}

