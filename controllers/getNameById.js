import { User } from "../models/userModel.js";

const getNameById = async(req, res)=>{
    try{
        const userId = req.params.userId;
        console.log(userId);

        const reqUser = await User.findOne({_id: userId});

        res.json({reqUser});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
}

export default getNameById;