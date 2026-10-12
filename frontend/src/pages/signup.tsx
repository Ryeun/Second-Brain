import { useRef } from "react";
import Button from "../components/button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){

    const navigate = useNavigate();

    const usernameRef= useRef<HTMLInputElement>(null);
    const passwordRef= useRef<HTMLInputElement>(null);

    async function signup(){

        const username= usernameRef.current?.value;
        const password= passwordRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                username,
                password
        })
        alert("user signed up");
        navigate("/signin");
    }


    return <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="w-80 bg-white p-8 rounded-2xl shadow-lg">
                <input ref={usernameRef} placeholder=" enter username" className="p-2 rounded-lg w-full mb-6 border"></input>
                <input ref={passwordRef} placeholder=" enter password" className="p-2 rounded-lg w-full mb-6 border"></input>
                <div className="text-blue-400 pb-2 cursor-pointer" onClick={() => {navigate("/signin")}}>Already signed up? Sign in</div>
                <div className="flex justify-center">
                    <Button onClick={signup}>Signup</Button>
                </div>
            </div>
        </div>
}
