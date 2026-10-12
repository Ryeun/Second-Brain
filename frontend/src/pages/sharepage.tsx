import Card from "../components/Card";
import { useParams } from "react-router-dom";
import Sharepg from "../hooks/sharepg";

export default function SharePage() {
    const {sharelink} = useParams();
    const content = Sharepg(sharelink);

    return (
        <div className="bg-[#FAF7FF] min-h-screen p-8">
            <div className="flex flex-wrap gap-4">
                {content.map(({ title, link, _id }) => (
                    <Card title={title} link={link} _id={_id} />
                ))}
            </div>
        </div>
    );
}