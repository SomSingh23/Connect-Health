import {Outlet,Link} from 'react-router-dom'
import './App.css'
export default function App() { 
  return <>

    <div className='wrapper'> <div className='navbar'>
<Link to='/'>Home</Link>

<Link to='/doctor'>Doctor</Link>

<Link to='/patient'>Patient</Link>

<Link to='/chat_bot'>AI Assistant</Link>

<Link to='/data_visualization'>Data Visualization</Link>
    </div>
    
    <Outlet/></div>
   
    
    
    </>
 }