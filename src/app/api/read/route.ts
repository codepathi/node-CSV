import fs from 'fs';
import { NextResponse } from 'next/server'

export async function GET(){
    const directory = "../newTask/public/uploads";

    // fs.readdir(directory, (error, data) => {
    //     if(error){
    //         return error;
    //     }
    //     console.log(data)
    //     return data;
    // })

    const data = fs.readdirSync(directory);
    
    return NextResponse.json(data)
    
}
