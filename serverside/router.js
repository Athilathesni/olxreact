import { Router } from "express";
import * as rh from './requesthandler.js'

const router=Router();

router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)

export default router
