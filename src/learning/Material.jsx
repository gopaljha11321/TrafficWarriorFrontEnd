import { Button } from '@mui/material';
// api.get("/testing").then(()=>{
//     console.log(res)
// })
const Material=()=>
{
    return(<>
    <div className="container">
    <div className="data">  <h1>React MUI</h1>
    <button style={{"border":"2px solid grey"}} >Submit</button>&nbsp;
    <Button variant='contained' color='success'>success</Button>&nbsp;
    <Button variant="outlined" color='error' onClick={()=>
    {
        console.log("button push")
    }}>Contained</Button>
    </div>
    </div>
    </>)
}
export default Material;