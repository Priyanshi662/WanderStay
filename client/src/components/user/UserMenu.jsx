import { ListItemIcon ,MenuItem,Menu } from "@mui/material";
import { Dashboard,Logout,Settings} from "@mui/icons-material";
import React,{useEffect} from "react";
import { useValue } from "../../context/ContextProvider";
import useCheckToken from "../../../../server/hooks/useCheckToken";
const UserMenu = ({anchorUserMenu,setAnchorUserMenu}) => {
    const dispatch = useValue();
    useCheckToken();
    const testAuthorization=async()=>{
        const url='http://localhost:5173'+'/room'
        try{
            const response=await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${currentUser.token}`
                }
            })
            const data= await response.json()
            console.log(data)
            if(!data.success)
            {
                if(response.status===401)
                    dispatch({type:"UPDATE_USER",payload:null})
                throw new Error(data.message)
            }
        }
        catch(error)
        {
            dispatch({type:'UPDATE_ALERT',payload:{open:true,severity:'error',message:error.message}})
        }
        }
    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null);
    }
    return(
        <>
        <Menu 
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        >
            <MenuItem onClick={testAuthorization}>
            <ListItemIcon>
                <Settings fontSize="small"/>
            </ListItemIcon>
            Profile
            </MenuItem>
            <MenuItem onClick={()=>dispatch({type:"UPDATE_USER",payload:null})}>
            <ListItemIcon>
                <Logout fontSize="small"/>
            </ListItemIcon>
            
            </MenuItem>
        </Menu>
        </>
    )   
}
export default UserMenu;