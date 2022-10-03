import axios from 'axios';
import Cookies from 'js-cookie';
import { getToken } from 'next-auth/jwt';
import {NextResponse} from 'next/server';
import { useContext } from 'react';
import { AuthContext } from './context';


export async function middleware(req : any) {
    const token = req.cookies.get("token");
    const { pathname, origin } = req.nextUrl;
    const url = req.url;

    if (url.includes("/auth")) {
        console.log('entra1')
        if(token && token != undefined){
            return NextResponse.redirect(`${origin}`);
        }else{
            return NextResponse.next();
        }
    }

    if (url.includes("/submission") || url.includes("/history") || url.includes("/profile") || pathname == "/") {
        if(token == undefined){
            console.log('entra2')

            return NextResponse.redirect(`${origin}/auth/login`);
        }
    }

    return NextResponse.next();

}


