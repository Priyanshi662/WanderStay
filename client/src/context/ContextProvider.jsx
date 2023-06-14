import React,{createContext,useContext,useEffect,useReducer} from 'react'
import reducer from './reducer'
const initialState={
    currentUser:null,
    openLogin:true,
    loading:false,
    alert: { open: false, severity: 'info', message: '' }
}
// User should be a global state because it is used in many components
// Login should be a global state because we can login from multiple places in the project
const Context=createContext(initialState)
// Context = object that holds the global state

// useValue 




export const useValue=()=>
{
    return useContext(Context)
}

const ContextProvider=({children})=>
{
    const [state,dispatch]=useReducer(reducer,initialState)
    useEffect(()=>{
        // the user is stored as a string , we parse it as an object using json.parse
        const currentUser=JSON.parse(localStorage.getItem('currentUser'))
        if(currentUser)
        {
            dispatch({type:"UPDATE_USER",payload:currentUser})
        }
    },[])
    return (
        <Context.Provider value={{state,dispatch}}> {children}</Context.Provider>
    )
}
export default ContextProvider;