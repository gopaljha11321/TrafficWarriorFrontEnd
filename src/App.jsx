import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { main } from './routes/main.routes';
const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
       {main.map((route,index)=>
       {
        const Component=route.component;
        return(
          <Route key={index} path={route.path} element={<Component/>}>
        </Route>
        )
       })}
      <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}
export default App