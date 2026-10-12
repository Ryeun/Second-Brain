import { ShareIcon } from "../icons/share";
import { DeleteIcon } from "../icons/delete";
import { BACKEND_URL } from "../config";
import axios from "axios"

type cardProps = {
  title: string,
  description?: string,
  link?: string,
  _id: string
}

export default function Card({title, description, link, _id}: cardProps) {
  const isYoutube = link?.includes("youtube.com") || link?.includes("youtu.be");
  const embedLink = isYoutube
  ? `https://www.youtube.com/embed/${link?.split("v=")[1]?.split("&")[0] || link?.split("/").pop()}`
  : `https://platform.twitter.com/embed/Tweet.html?id=${link?.split("/status/")[1]?.split("?")[0]}`;

  return <div className="border border-purple-100 rounded-lg  p-6 w-80 bg-white shadow-sm m-9 hover:border-purple-300">
          <h1 className="flex justify-between pb-6">
            <div className="flex items-center gap-6 justify-center">
              {title}
            </div>

            <div className="flex items-center gap-4 justify-center">
              <div className="cursor-pointer"> <ShareIcon/> </div>

              <div
            onClick={async () => {
              await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                },
                data: {
                  _id: _id,
                },
              });
              window.location.reload();
            }}
            className="cursor-pointer">
            <DeleteIcon />
          </div>

            </div>

            </h1>
          <p className="text-slate-500">{description}</p>
          <iframe className="w-full rounded-lg aspect-video" src={embedLink} title={title} allowFullScreen />
        </div>
}
