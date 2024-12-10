import { Router } from "express";
import * as rh from './requesthandler.js'
// import Auth from './middle/Auth.js';
const router=Router();

router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyEmail)
// router.route('/getuser').get(Auth,rh.getuser)

export default router
