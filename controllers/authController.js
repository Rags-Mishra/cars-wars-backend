import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateJWT=(req,res,next)=>{
    const token=re.header(Authorization)?.split('')[1];
    if(token){
        return res.status(401).send('Access denied. No token provided');
    }
    try {
        const decoded=jwt.verify(token.process.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};