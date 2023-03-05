import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Tickets(){
    let { eventAddress, category } = useParams();
    const [url, setUrl] = useState("");

    function getVisual(visualDates, owner, eventId, category, images){
        var visual = Object.values(visualDates[category]).forEach((date, index) => {
            if(new Date(date).getTime() > new Date().getTime()){
                return index - 1;
            }
        });

        if (!visual) {
            visual = Object.values(visualDates[category]).length -1;
        }

        const url = `${process.env.REACT_APP_BACKEND_URL}/uploads/${owner}/${eventId}/${category}/${images[category][visual]}`;
        setUrl(url);
    }

    async function test(){
        const url = `${process.env.REACT_APP_BACKEND_URL}/api/test`;

        await fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

    }

    async function fetchDatas(){
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/findEvent`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventAddress: eventAddress
            })
        });
        
        if(response.status == 404){
            return;
        }

        const { datas } = await response.json();

        const { visualDates, owner, eventId, images } = datas;

        getVisual(visualDates, owner, eventId, category, images);
        setInterval(() => {
            getVisual(visualDates, owner, eventId, category, images)
        }, 1000);
        // TODO: Replace /0/ par vip ou non
        // TODO: Add visual name at the end
        
 
    }
    
    useEffect(() => {
        fetchDatas();
    });

    return (
        <div onClick={() => test()}>
            <img src={`${url}`} />
        </div>
    );
}