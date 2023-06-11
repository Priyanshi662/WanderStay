export const createRoom = async (req, res) => {
    res.status(201)
    .json({success:true,result:{id:123,title:'test room'}});
};