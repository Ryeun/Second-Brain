import { useState } from "react";
import Button from "../components/button";
import Card from "../components/Card";
import { PlusIcon } from "../icons/plus";
import { ShareIcon } from "../icons/share";
import Modal from "../components/addContentModal";
import UseContent from "../hooks/userContent";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logout from "../icons/logout";
import AllcontentIcon from "../icons/allcontent";
import Brain from "../icons/brain";
import Twitter from "../icons/twitter";
import Utube from "../icons/utube";

export default function Dashboard() {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  
  const [filter,setFilter] = useState("all");
  const contents = UseContent();
  const content = contents.filter(({link}) => {
    if (filter === "youtube"){
      return link.includes("youtube.com") || link.includes("youtu.be")
    }
    if (filter === "twitter"){
      return link.includes("twitter.com") || link.includes("x.com")
    }
    return true;
  })

  return (
    <div className="bg-[#FAF7FF] min-h-screen w-full">

      <div className="w-72 border-r border-purple-100 h-screen bg-white shadow-md fixed p-4">
        <h1 className="rounded-lg px-4 py-3 pb-10 flex items-center gap-4 text-purple-950 font-semibold"> <Brain/> SECOND BRAIN</h1>
        <div onClick={() => setFilter("all")} className=" cursor-pointer rounded-lg px-4 py-3 text-slate-600 hover:text-purple-800 hover:bg-purple-50 flex items-center gap-4"><AllcontentIcon/> All</div>
        <div onClick={() => setFilter("youtube")} className=" cursor-pointer rounded-lg px-4 py-3 text-slate-600 hover:text-purple-800 hover:bg-purple-50 flex items-center gap-4"> <Utube/> Youtube</div>
        <div onClick={() => setFilter("twitter")} className=" cursor-pointer rounded-lg px-4 py-3 text-slate-600 hover:text-purple-800 hover:bg-purple-50 flex items-center gap-4"> <Twitter/> Twitter</div>
      </div>

    <div className="flex justify-end w-fit ml-auto gap-8 pr-6 pt-4">
      <Button onClick={() => setIsOpen(true)}> <PlusIcon/> Add Content</Button>

      <Button variant="secondary"
      onClick={async () => {
        const token = localStorage.getItem("token")
        if (!token){
          alert("Please sign in first");
          return;
        }

        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,
        {
          share: true
        },
        {
        headers: {
          "Authorization": token
        }
      });
        const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
        await navigator.clipboard.writeText(shareUrl);
        alert(`Share link copied: ${shareUrl}`);
      }}> <ShareIcon/> Share Content</Button>

      <Button variant="tertiary" onClick={() => {
        navigate("/signin");
        localStorage.removeItem("token");
        }}> <Logout/>Logout</Button>

    </div>
    <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)} ></Modal>
    <div className="ml-80 flex flex-wrap">
      {content.map(({title, link, _id}) => <Card title={title} link={link} _id={_id}></Card>)}
    </div>
    </div>
  )
}
