// const mongoose = require('mongoose');
let Member = require('../models/member');
let express = require('express');
let router = express.Router();

let bcrypt = require('bcrypt-nodejs');

router.signUp = (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    var member = new Member();
    member.member_name = req.body.member_name;
    //check email format
    member.email = req.body.email;
    let checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    //encrypt password
    member.password = bcrypt.hashSync(req.body.password);
    member.confirmpwd = bcrypt.hashSync(req.body.confirmpwd);

    // member.phone = req.body.phone;//phone数字限制
    // member.shipping_address = req.body.shipping_address;//格式识别
    // member.payment_info = req.body.payment_info;//选择选项后把数据传到这里
    // member.gender = req.body.gender;

    if(member.email == null || member.password == null || member.confirmpwd == null){
        //必填的信息，如果觉得其他信息需要必填，models表里的属性加上required
        res.json({message: 'email, password and confirm password are required!', data: null})
    }
    else if(!checkEmail.test(member.email)){//验证邮箱格式
        res.json({message: 'Wrong email format!'})
    } else if((8 > req.body.password.length) || (8 > req.body.confirmpwd.length)){//密码长度8-15位
        res.json({message: 'Password should be more than 8 characters!',data:null})
    } else if((15 < req.body.password.length) || (15 < req.body.confirmpwd.length)){
        res.json({message: 'Password should be less than 15 characters!',data:null})
    } else if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,15}/.test(req.body.password))){
        //密码强度：数字，大小写字母，特殊字符
        res.json({ message: 'Password must have number,special character, lowercase and capital Letters!', data: null});
    } else if (req.body.password !== req.body.confirmpwd){
        //两次输入的密码相同
        res.json({message: 'Please input the same password!',data:null})
    }
    else {
        Member.findOne({email: req.body.email}, function (err, user) {
            if (user) {
                res.json({message: 'Account already exists! Please change another email.', data: null});
            } else {
                member.save(function (err) {
                    if (err) {
                        res.json({message: 'Fail to register!', err: err, data: null});
                    } else {
                        res.json({message: 'Sign Up Successfully!', data: member});
                    }
                });
            }
        });
    }

};
router.login = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    Member.findOne({email: req.body.email}, function (err, member) {
        if (!member) {
            res.json({message: 'Please sign up first!', data: null});
        } else {
            if (bcrypt.compareSync(req.body.password, member.password)) {
                // res.cookie('member', customer.email, {
                //     httpOnly: true,//避免被 xss 攻击拿到 cookie。
                //     signed: true
                // });
                let token = member.generateAuthToken();
                res.header('token', token);
                res.json({message: 'Welcome to our website! ' + member.member_name, data: member});
                console.log(token)
            }
            else
                res.json({message: 'Wrong password!', data: null});
        }
    });
}

router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    //find by id, name, email, phone
    Member.find({"email": req.params.email}, function(err, member) {
        if (err)
            res.json({message:'Member Not Found!', errmsg: err});
        else
            res.send(JSON.stringify(member, null, 5));
    });
}
router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Member.find(function(err, member) {
        console.log(member);
        if (err)
            res.send(err);

        res.send(JSON.stringify(member,null,5));
    });
}
router.deleteMember = (req, res) => {
    //delete by name, id, email, phone
    Member.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.json({message: 'Member Not Deleted!', errmsg: err});
        else
            res.json({message:'Member Deleted Successfully!'});
    });
}

router.changePassword = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.params.member == null) {
        res.json({ message: 'You can not change password!'});
    } else {
        let member = new Member();
        member.password = bcrypt.hashSync(req.body.password);
        member.confirmpwd = bcrypt.hashSync(req.body.confirmpwd)
        if (member.password == null || member.confirmpwd == null) {
            res.json({message: 'Password and confirm password are all required!', data: null})
        } else if ((8 > req.body.password.length) || (8 > req.body.confirmpwd)) {
            res.json({message: 'Password should be more than 8 characters!', data: null})
        } else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W])[a-zA-Z\d\W?$]{8,16}/.test(req.body.password))) {
            res.json({
                message: 'Password must has number,special character, lowercase and capital Letters!',
                data: null
            });
        } else if (req.body.password !== req.body.confirmpwd) {
            res.json({message: 'Please input the same password!', data: null})
        }
        else {
            Member.findOneAndUpdate({"email": req.params.member},
                {
                    password: bcrypt.hashSync(req.body.password),
                    confirmpwd: bcrypt.hashSync(req.body.confirmpwd)
                },
                {new: true},
                function (err, member) {
                    if (err)
                        res.json({message: 'Unable to change', errmsg: err});
                    else
                        res.json({message: 'Password changed successfully!', data: member});
                });
        }
    }
};


module.exports = router;