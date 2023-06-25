import {createContext,
    useContext,
    useEffect,
    useRef,
    useReducer
} from 'react'
import reducer from './reducer'

const initialState={
    currentUser:null,
    openLogin:false,
    loading:false,
    alert: { open: false, severity: 'info', message: '' },
    profile:{open:false, file:null ,photoURL :''},
    images:[],
    details:{title:'',description:'',price:0},
    location:{lng:0,lat:0},
    rooms:[],
    priceFilter:50,
    addressFilter:null,
    filteredRooms: [],
    room:null,
    users:[]
};
// User should be a global state because it is used in many components
// Login should be a global state because we can login from multiple places in the project

const Context=createContext(initialState);
// Context = object that holds the global state

// useValue 

export const useValue=()=>
{
    return useContext(Context)
};

const ContextProvider=({children})=>
{
    const [state,dispatch]=useReducer(reducer,initialState)
    const mapRef=useRef();
    const containerRef=useRef();
    useEffect(()=>{
        // the user is stored as a string , we parse it as an object using json.parse
        const currentUser=JSON.parse(localStorage.getItem('currentUser'))
        if(currentUser)
        {
            dispatch({type:"UPDATE_USER",payload:currentUser})
        }
    },[]);
    
    useEffect(() => {
        if (state.currentUser) {
          const room = JSON.parse(localStorage.getItem(state.currentUser.id));
          if (room) {
            dispatch({ type: 'UPDATE_LOCATION', payload: room.location });
            dispatch({ type: 'UPDATE_DETAILS', payload: room.details });
            dispatch({ type: 'UPDATE_IMAGES', payload: room.images });
            // dispatch({ type: 'UPDATE_UPDATED_ROOM', payload: room.updatedRoom });
            // dispatch({
            //   type: 'UPDATE_DELETED_IMAGES',
            //   payload: room.deletedImages,
            // });
            // dispatch({ type: 'UPDATE_ADDED_IMAGES', payload: room.addedImages });
          }
        }
      }, [state.currentUser]);

    return (
        <Context.Provider value={{state,dispatch,mapRef,containerRef}}> 
        {children}
        </Context.Provider>
    );
}
export default ContextProvider;