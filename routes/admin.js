// const mongoose = require('mongoose');
let Admin = require("../models/admin")
let Member = require("../models/member")
let Artwork = require("../models/artwork")
let express = require("express")
let router = express.Router()
let bcrypt = require("bcrypt-nodejs")
router.login = (req, res) => {
  res.setHeader("Content-Type", "application/json")

  Admin.findOne({email: req.body.email}, function (err, admin) {
    if (!admin) {
      res.json({message: "Please sign up first!", data: null})
    } else {
      // if (bcrypt.compareSync(req.body.password, admin.password)) {
      if (req.body.password === admin.password) {
        let token = admin.generateAuthToken()
        res.header("token", token)
        res.json({message: "Welcome to our website! ", data: admin})
        console.log(token)
      }
      else
        res.json({message: "Wrong password!", data: null})
    }
  })
}

router.findAll = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  Admin.find(function(err, admin) {
    console.log(admin)
    if (err)
      res.send(err)
    else
      res.send(JSON.stringify(admin,null,5))
  })
}
router.findOne = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  Admin.find({ "email" : req.params.email },function(err, admin) {
    if (err)
      res.json({ message: "Administrator NOT Found!", errmsg : err } )
    else
      console.log(admin)
    res.send(JSON.stringify(admin,null,5))
  })
}
// router.deleteMember = (req, res) => {
//     //delete by name, id, email, phone
//     Member.findByIdAndRemove(req.params.id, function(err){
//         if(err)
//             res.json({message: 'Member Not Deleted!', errmsg: err});
//         else
//             res.json({message:'Member Deleted Successfully!'});
//     });
// }
router.addMember = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  let member = new Member()
  member.member_name = req.body.member_name
  //check email format
  member.email = req.body.email
  let checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  //encrypt password
  member.password = bcrypt.hashSync(req.body.password)
  member.confirmpwd = bcrypt.hashSync(req.body.confirmpwd)

  if(member.email == null || member.password == null || member.confirmpwd == null){
    //必填的信息，如果觉得其他信息需要必填，models表里的属性加上required
    res.json({message: "email, password and confirm password are required!", data: null})
  }
  else if(!checkEmail.test(member.email)){//验证邮箱格式
    res.json({message: "Wrong email format!"})
  } else if((8 > req.body.password.length) || (8 > req.body.confirmpwd.length)){//密码长度8-15位
    res.json({message: "Password should be more than 8 characters!",data:null})
  } else if((15 < req.body.password.length) || (15 < req.body.confirmpwd.length)){
    res.json({message: "Password should be less than 15 characters!",data:null})
  } else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,15}/.test(req.body.password))){
    //密码强度：数字，大小写字母，特殊字符
    res.json({ message: "Password must have number,special character, lowercase and capital Letters!", data: null})
  } else if (req.body.password !== req.body.confirmpwd){
    //两次输入的密码相同
    res.json({message: "Please input the same password!",data:null})
  }
  else {
    Member.findOne({email: req.body.email}, function (err, member) {
      if (member) {
        res.json({message: "Account already exists! Please change another email.", data: null})
      } else {
        // console.log(member)
        member.save(function (err) {
          if (err) {
            res.json({message: "Fail To Add Member!", err: err, data: null})
          } else {
            res.json({message: "Add Member Successfully!", data: member})
          }
        })
      }
    })
  }

}
router.removeArtwork = (req, res) => {
  Artwork.findByIdAndRemove(req.params.id, function(err){
    if(err)
      res.json({message:"Artwork Not Deleted!", errmsg: err})
    else
      res.json({message:"Artwork Successfully Deleted!"})
  })
}
module.exports = router