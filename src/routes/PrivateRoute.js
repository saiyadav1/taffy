import { Children, useContext } from 'react';
import {Outlet,Navigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../DashboardComponent/header';


const PrivateRoutes=()=>{
    const {client}=useContext(AuthContext)
    return(
        client?
        <Header><Outlet/></Header>
        :<Navigate to='/login'/>
        
    )
}
export default PrivateRoutes