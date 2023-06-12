import {useEffect} from 'react'
import { useValue } from '../../client/src/context/ContextProvider';
import jwtDecode from 'jwt-decode';
const useCheckToken=()=>{
    const {state:{currentUser},dispatch}=useValue();
    useEffect(()=>{
        if(currentUser)
        {
            const decodedToken=jwtDecode(currentUser.token)
            if(decodedToken.exp*1000<Date.now().getTime())
            {
                dispatch({type:'UPDATE_USER',payload:null})
            }
        }
    },[])
}
export default useCheckToken;