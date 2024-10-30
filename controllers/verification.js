import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const verification = async (req, res) => {
    try {
        const { jwtPath } = req.body; 
        const isAuthenticated = jwt.verify(jwtPath, process.env.JWT_SECRET);
        
        const user = await User.findOne({ _id: isAuthenticated.id });
        
        if (user) {
            user.isVerified = true;
            await user.save();

            console.log(user.isVerified);
            
            res.json(user);
        } else {
            res.status(404).send('No user found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export default verification;
