import Button from "./button"
import { Cross } from "../icons/cross"
import axios from "axios"
import { useRef } from "react"
import { BACKEND_URL } from "../config"

type modelprops = {
    isOpen: boolean
    onClose: ()=> void
}

export default function Modal ({isOpen,onClose}: modelprops){

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    async function addContent(){
        const title = titleRef.current.value;
        const link = linkRef.current.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,
            link
        },{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
    }

    if (!isOpen){
        return null
    }
    return <div className="inset-0 flex justify-center items-center fixed bg-black/60">
        <div className="relative w-96 h-80 rounded-lg bg-white p-10 shadow-xl">
            <div onClick={onClose} className="absolute right-4 top-3 cursor-pointer"><Cross/></div>
            <input ref={titleRef} type="text" placeholder=" Enter title" className="rounded-lg mb-5 w-full mt-12 border h-8"></input>
            <input ref={linkRef} type="text" placeholder=" Enter link" className="rounded-lg mb-5 mt-10 w-full border h-8"></input>
            <div className="flex justify-center mt-6">
                <Button onClick={addContent}>Submit</Button>
            </div>
        </div>
    </div>
}
