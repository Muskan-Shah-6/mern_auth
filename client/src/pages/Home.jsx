import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { logoutUser } from "../utils/auth";
const Home = () => {

    const [userName, setUserName] = useState("")
    // fetch the data from api
    useEffect(() =>{
        const fetchUser = async() =>{
            try{
                const id = localStorage.getItem("userID")
                console.log("The user id is :", id)
                if(!id) return;

                const res = await axios.get(`http://localhost:1568/api/auth/${id}`)
                setUserName(res.data.username)
                console.log("the response is :", res.data.username)
            }catch(err){
                console.log("error: ", err)
            }
        }
        fetchUser()
    },  [])

    
  return (
    <>
      <section className="bg-gray-900">
        <div className="flex justify-center items-center h-screen">
          <div className="flex-block space-y-4">
            <h1 className="text-blue-700 text-xl lg:text-5xl animate-bounce">
                {userName ? `Welcome, ${userName}!` : "Loading..."}
            </h1>
            <div className="flex justify-center gap-5 lg:gap-20">
              <Link
                to={"/register"}
                className="w-25 h-10 p-2 text-center bg-transparent border rounded-sm text-blue-700 hover:text-white transition-all shadow-md shadow-blue-500/50"
              >
                {" "}
                Register
              </Link> 
              <Link
                to={"/login"}
                onClick={() => logoutUser()}
                className="w-25 h-10 p-2 text-center bg-transparent border rounded-sm text-blue-700 hover:text-white transition-all shadow-md shadow-blue-500/50"
              >
                {" "}
                Logout
              </Link>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
