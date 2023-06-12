const reducer=(state,action)=>{
    switch(action.type){
        // login
        case 'OPEN_LOGIN':
            return{ ...state,openLogin:true};
        case 'CLOSE_LOGIN':
            return{ ...state,openLogin:false};
        // Loading state
        case 'START_LOADING':
            return { ...state, loading: true };
        case 'END_LOADING':
            return { ...state, loading: false };
        // user 
        case 'UPDATE_USER':
            // for having user session = to stay logged in after leaving the web app
            localStorage.setItem('currentUser',JSON.stringify(action.payload))
            return{ ...state,currentUser:action.payload}
        // Alert 
        case 'UPDATE_ALERT':
            return { ...state, alert: action.payload };
        default:
            throw new Error("No matching action!")
    }
}
export default reducer