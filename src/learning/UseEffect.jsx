import './learning.css';
import {useState} from 'react';
import { useEffect } from 'react';
const UseEffect=(prop)=> 
{
    // const {...data}=prop.data;
    // console.log(data.name,data.age,data.number);
    const [count,setCount]=useState(0);
    useEffect(()=>
    {
        document.title=`Info (${count})`;
    })
    return (
        <>
        <div className="container"><div className="text-center">{count}<br/>
            <div className="button1">
        <button onClick={()=>
        {
            setCount(count+1);
        }} >Count</button>
        </div>
        </div>
        </div>
        </>
       )
}
export default UseEffect;