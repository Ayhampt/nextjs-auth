"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";





export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState('nothing')
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id)
      toast.success("detais fectched successful");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  
  return (
    <div className="flex flex-wrap justify-center items-center h-screen m-10">
      <div className=" relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zwhySGCEBxRRFYIcQgvOLOpRGqrT3d7Qng&s"
                  className="shadow-xl rounded-lg align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                />
              </div>
            </div>
            <div className="w-full text-center mt-20">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    3,360
                  </span>
                  <span className="text-sm text-slate-400">Photos</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    2,454
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    564
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              ayham
            </h3>
            <h3 className="text-xl text-slate-700 font-bold leading-normal mb-1">
              {data === "nothing" ? (
                "nothing"
              ) : (
                <Link href={`/profile/${data}`}>{data}</Link>
              )}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              Paris, France
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  An artist of considerable range, Mike is the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm.
                </p>
                <Link
                  href="/login"
                  className="font-normal text-slate-700 hover:text-slate-400 bg-amber-600 rounded-lg px-4 py-2"
                >
                  Follow Account
                </Link>

                <hr className="text-black mt-6" />
                <div className="mt-6">
                  <button
                    onClick={logout}
                    className="bg-amber-800 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none hover:bg-amber-600 focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
                <div className="mt-6">
                  <button
                    onClick={getUserDetails}
                    className="bg-green-800 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none hover:bg-amber-600 focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer"
                    type="button"
                  >
                    get details
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


