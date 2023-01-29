import { useState } from 'react';
import './learning.css';
const State=()=> 
{
    const [count,setCount]=useState(0);
    const [array,setArray]=useState(["gopal","ram","shayam","aam","khata","hae"]);
   return (
    <>
       {/* if statement in jsx */}
    {count%5==0 && <div >count is divisable to 5</div>}


    {/* loop in jsx */}

    {array.map((item,index)=>
    {
       return ( <div key={index}>{item} on index {index}</div>)
    })}

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
export default State;