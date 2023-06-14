import fetchData from "./utils/fetchData"
// need to enable cors for fetching this URL
const url='http://localhost:5173/'+'/user'

export const register =async(user,dispatch)=>{
    dispatch({type:"START_LOADING"})
    const result=await fetchData({url:url+'/register',body:user},dispatch)
    if(result)
    {
        dispatch({type:"UPDATE_USER",payload:result})
        dispatch({type:"CLOSE_LOGIN"})
        dispatch({type:"UPDATE_ALERT",payload:{open:true,severity:'success',message:"Your account has been created successfully"}})
    }
    // send request with fetch
    dispatch({type:"END_LOADING"})
};