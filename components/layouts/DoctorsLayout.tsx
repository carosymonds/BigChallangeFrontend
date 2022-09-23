import { FC } from 'react';
import Head from 'next/head';
import SideMenu from '../ui/SideMenu';
import { ILayout } from '../../interfaces/layout';

export const DoctorsLayout:FC<ILayout> = ({ children, title, pageDescription }) => {
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

