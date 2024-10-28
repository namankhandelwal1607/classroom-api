import { User } from "../models/userModel.js";

const getNameById = async (req, res) => {
    try {
        const userId = req.params.userId; 
        console.log("User ID:", userId);

        const reqUser = await User.findOne({ _id: userId });

        if (!reqUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user: reqUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
}

export default getNameById;
