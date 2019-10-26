let mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
        admin_name: String,
        admin_id: String,
        // admin_gender: options(),
        email: {
            type: String,
            required : true
        },//网址链接嫩不能存在数据库里,以邮件格式储存到数据库里
        password: {
            type: String,
            required: true
        }

    },
    {collection: 'admindb'});
module.exports = mongoose.model('Admin', AdminSchema);