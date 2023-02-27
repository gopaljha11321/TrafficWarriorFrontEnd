import { useState } from 'react';
import './learning.css';
let val=""
const input =["Apple", "PineApple", "Mango", "banana", "orange", "papaya", "kiwi"];
const State=()=> 
{
    const [count,setCount]=useState(0);
    const [result,setResult]=useState([]);
    const [array,setArray]=useState(["gopal","ram","shayam","aam","khata","hae"]);
    const find=(a)=>
{
   return a.toLowerCase().search(val.toLowerCase())>-1;
}
  return (
    // <>
    //    {/* if statement in jsx */}
    // {count%5==0 && <div >count is divisable to 5</div>}

    // <div className="container"><div className="text-center">{count}<br/>
    //     <div className="button1">
    // <button onClick={()=>
    // {
    //     setCount(count+1);
    // }} >Count</button>
    // </div>
    // </div>
    // </div>
    // </>
    <>
    search algo of react 
    <input type="text" name="" id="" onChange={(evt)=>{val=evt.target.value;setResult(input.filter(find))}} />
    {result.map((item)=>
    {
        return(<>
        <div key={item}>{item}</div>
        </>)
    })}
    </>
   )
}
export default State;