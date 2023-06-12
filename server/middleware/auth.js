import {OAuth2Client} from 'google-auth-library';
const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// following the authentication documentation from google
const auth=async(req,res,next)=>{
    try{
        // since it is Bearer token, we need to split it
        const {token}=req.headers.authorization.split(' ')[1];
        const googleToken=token.length>1000
        // if the token is from google, we need to verify it
        if(googleToken){
            const ticket=await client.verifyIdToken({
                idToken:token,
                audience:process.env.GOOGLE_CLIENT_ID
            });
            const payload=ticket.getPayload();
            req.user={id:payload.sub,name:payload.name,photoURL:payload.picture};
        }   
        else{

        }
        next();
    }
    catch(error){
        console.log(error);
        req.status(401).json({success:false,error:'Not authorized to access this route'});
    }
}
export default auth;