import { useState } from 'react';
import './learning.css';
import Header from '../components/molecules/Header';
const State=()=> 
{
    const [count,setCount]=useState(0);
   return (
    <>
    <Header></Header>
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