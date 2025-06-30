import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDb } from "@/dbconfig/dbconfig";

import bcrypt from "bcryptjs";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, token } = reqBody;
    console.log(password);
    console.log(token);
    
    

    if (!token || !password) {
      return NextResponse.json(
        { error: "token or password not found" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 401 });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
