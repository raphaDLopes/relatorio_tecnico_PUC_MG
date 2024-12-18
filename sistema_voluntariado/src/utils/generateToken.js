import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

export default generateToken