import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import User, {IUser} from '../models/User'

declare global{
  namespace Express {
    interface Request{
      user?: IUser
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) =>{
  const bearerToken = req.headers.authorization
  
  if(!bearerToken){
    const error = new Error('Not Authorized')
    res.status(401).send({error: error.message})
    return;
  }
  
  const [, token] = bearerToken.split(' ')
  
  if(!token){
    const error = new Error('Not Authorized')
    res.status(401).send({error: error.message})
    return;
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET);
    console.log(result)
    if(typeof result === 'object' && result.userID){
      const userID = result.userID;
      console.log(userID)
      const user = await User.findById(userID).select('-password')

      if(!user){
        const error = new Error("User not found")
        res.status(404).send({error: error.message})
        return;
      }
      req.user = user;
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({error:'Invalid Token'})
  }
}