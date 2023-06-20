import fetchData from './utils/fetchData'

const url= import.meta.env.VITE_APP_SERVER_URL+'/room';

export const createRoom=async(room,currentUser,dispatch,setPage)=>
{
    dispatch({type:'START_LOADING'});

    const result=await fetchData(
        { url , body :room,token:currentUser?.token},
        dispatch
    )
    if(result)
    {
        dispatch({
            type:'UPDATE_ALERT',
            payload:{
                open:true,
                severity :'success',
                message: 'The room has been added successfully'
            },
        });
        dispatch({type:'RESET_ROOM'})
        setPage(0);
    }
    dispatch({type:'END_LOADING'});
};