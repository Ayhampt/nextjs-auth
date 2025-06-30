'use client'
import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function emailInput() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });
  const [loading,setLoading] = React.useState(false)

  const onEmailInput = async () => {
    try {
        const response = await axios.post("/api/users/emailinput",user);
        console.log(response.data);
        toast.success("check your email to proceed further")
        
        
        
    } catch (error:any) {
        console.log("error in reciving the input mail");
        toast.error("try again,error in input mail")
       
    }finally{
        setLoading(false)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mb-2 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Enter your Email
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="Email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="John@gmail.com"
                className="border-1 rounded-lg p-2 
              border-amber-50"
                onChange={(e) => setUser({...user, email: e.target.value })}
              ></input>
            </div>
            <button
              className="bg-amber-50 hover:bg-amber-100 text-black font-bold py-1 px-4 rounded"
              onClick={onEmailInput}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );


}
