import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function Sharepg(sharelink: string){
    const [content, setContent] = useState([]);
    
    useEffect(() =>  {
        axios.get(`${BACKEND_URL}/api/v1/brain/${sharelink}`)
        .then((response) => {
            setContent(response.data.content)
        })
    },[]);

    return content;
}