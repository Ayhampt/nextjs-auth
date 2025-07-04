import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
;
import { connectDb } from "@/dbconfig/dbconfig";

connectDb()

export async function GET(request:NextRequest){
    try{
       const userId = await getDataFromToken(request);
       const user = await User.findOne({ _id: userId }).select("-password");
       return NextResponse.json({message: "User found", data:user})

    }catch(error:any){
        return NextResponse.json({error:error.message}, {status:500})



    }
}
