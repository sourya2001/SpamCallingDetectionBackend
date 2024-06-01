const express= require('express')
const {addContact,getContacts,queryByName}=require("../Controllers/contactController");
const protect = require('../Middleware/authMiddleware');
const router=express.Router();



router.post('/',protect,addContact)
router.get('/',protect,getContacts)
//router.get('/showDetailforaQuerybyName',protect,queryByName)


module.exports=router;