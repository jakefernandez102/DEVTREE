import type { Request, Response } from "express";
import User from "../models/User";
import {hashPassword, verifyPassword} from "../utils/auth";
import slug from 'slug';
import {generateJWT} from "../utils/jwt";
import formidable from 'formidable'
import cloudinary from '../config/coudinary'
import {v4 as uuid} from 'uuid'

export const createAccount =  async (req: Request,res: Response) =>{

  const {email,password} = req.body;

  const userExists = await User.findOne({email});
  if(userExists){
    const error = new Error('User already exists')
    res.status(409).json({message: error.message});
    return;
  }
  
  const handle = await processHandle(req.body.handle, req, res)
  if(handle.exists) return;

    try{
      const user = new User(req.body);
      user.password = await hashPassword(password)
      user.handle = handle.handle;
      await user.save();
      res.status(201).json({message: 'User created successfully',user});
    } catch(err){
      res.status(400).json({message: 'User could not be created',error: err.message});
    }
}

export const login = async (req:Request, res: Response) =>{

  const {email,password}= req.body;

  const user = await User.findOne({email})
  if(!user){
    res.status(404).send({error:'There is not an existing account with the email'})
    return;
  }

  const hashedPassword = user.password;
  const isValidPassword = await verifyPassword(password, hashedPassword)
  if(!isValidPassword){
    res.status(404).send({error:'The password does not corresponds to the account you are trying to login'})
    return;
  }else{
    const token = generateJWT({userID: user.id});
    res.status(200).send({message:`Logged In!!`,token})
  }


}

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user)
}

export const updateUserProfile = async (req: Request, res:Response, next: NewableFunction) =>{
  try {
    // const response = User.updateOne({})
    const {description, links} = req.body;
    const handle = await processHandle(req.body.handle, req, res)
    if(handle.exists) return;

    req.user.description = description;
    req.user.handle = handle.handle;
    req.user.links = links;

    req.user.save()
    res.status(200).send({message:'Profile Updated', user: req.user})

    console.log(req.body)
  } catch (err) {
    const error = new Error('There was an error');
    res.status(500).send({error: error.message})
  }
}

const processHandle = async (handle:string, req:Request, res:Response)=>{
  const processedHandle = slug(handle,'')
  const handleExists = await User.findOne({handle:processedHandle});
  if(handleExists && handleExists.email !== req.user.email){
    const error = new Error('Handle is already taken')
    res.status(409).json({error: error.message});
    return {exists:true, handle:processedHandle};
  }
  return {exists:false, handle:processedHandle};
}

export const uploadImage = async (req: Request, res:Response, next: NewableFunction) =>{

  try {
    const form = formidable({multiples:false})
    form.parse(req,(error, fields, files)=>{
      cloudinary.uploader.upload(files.file[0].filepath,{public_id: uuid()},(err, result)=>{
        if(err){
          const error = new Error('There was an error while uploading the image')
          res.status(500).send({error: error.message})
          return;
        }
        if(result){
          req.user.image = result.secure_url;
          req.user.save();
          res.json({image:req.user.image})
        }
      })
    })
  } catch (err) {
    const error = new Error('There was an error')
    res.status(409).send({error: error.message})
  }
}

export const getUserByHandle = async (req: Request, res:Response, next: NewableFunction) =>{

  try {
    const {handle} = req.params;
    
    const user = await User.findOne({handle}).select('-_id -__v -password -email');
    if(!user){
      const error = new Error('User not found')
      res.status(404).send({error: error.message})
      return;
    }

    res.status(200).json(user)
  } catch (err) {
    const error = new Error('There was an error')
    res.status(409).send({error: error.message})
  }
}

export const searchByHandle = async (req: Request, res:Response, next: NewableFunction) =>{

  try {
    const {handle} = req.body;
    console.log(handle)
    const userExists = await User.findOne({handle});
    if(userExists){
      const error = new Error(`${handle} is already taken.`)
      res.status(409).json({error:error.message})
      return;
    }

    res.send(`${handle} is available`)
  } catch (err) {
    const error = new Error('There was an error')
    res.status(409).send({error: error.message})
  }
}