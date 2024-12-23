import {Router} from "express";
import {createAccount, getUser, getUserByHandle, login, searchByHandle, updateUserProfile, uploadImage} from "../handlers";
import {body} from "express-validator";
import {handleInputErrors} from "../middlewares/validator";
import {authenticate} from "../middlewares/authenticate";

const router = Router();

router.post('/auth/register',
  body('handle')
    .notEmpty()
    .withMessage('The handle must not be empty'),
  body('name')
    .notEmpty()
    .withMessage('The name must not be empty'),
  body('email')
    .isEmail()
    .withMessage('The email is not valid'),
  body('password')
    .isLength({min:6})
    .withMessage('The password must have min 6 chars'),
  handleInputErrors,
  createAccount)
  
  router.post('/auth/login',
    body('email')
    .isEmail()
    .withMessage('Invalid Email'),
    body('password')
    .notEmpty()
    .withMessage('Password must not be empty'),
    handleInputErrors,
    login
  )

  router.get('/user', authenticate ,getUser)
  router.patch('/user',
    body('handle')
      .notEmpty()
      .withMessage('Handle cannot be empty value'),
    handleInputErrors,
    authenticate,
    updateUserProfile
  )

  router.post('/user/image', authenticate, uploadImage)

  router.get('/:handle', getUserByHandle)

  router.post('/search',
        body('handle')
      .notEmpty()
      .withMessage('Handle cannot be empty value'),
      handleInputErrors,
    searchByHandle)

export default router