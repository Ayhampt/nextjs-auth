"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



export default function ForgotPass() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [user, setUser] = useState({
    password: " ",
    token: token,
  });
  
   
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onForgot = async () => {
    try {
      const response = await axios.post("/api/users/forgot", user);
      console.log("Forgot password successfully updated", response.data);
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Forgot password failed", error);
      toast.error(" unable to update Forgot password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mb-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot Password
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                className="border-1 rounded-lg p-2 
              border-amber-50"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              ></input>
            </div>
            <button
              className="bg-amber-50 hover:bg-amber-100 text-black font-bold py-1 px-4 rounded"
              onClick={onForgot}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
