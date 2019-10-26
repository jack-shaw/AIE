let mongoose = require('mongoose');

let MemberSchema = new mongoose.Schema({
        member_name: String,
        username: String,//昵称
        phone: String,//或者是其他的形式，数字？
        email: {
            type: String,
            required : true
        },//网址链接嫩不能存在数据库里,以邮件格式储存到数据库里
        password: {
            type: String,
            required: true
        },
        confirmpwd: {
            type: String,
            required: true
        },
        // gender: options(),//二选一
        // purchase_history
        //connect facebook
        // shipping_address: String,//限制字符长度，further：识别国家，省，市，县
        // payment_info: getOption(),//支持的支付选项
    },
    {collection: 'memberdb'});
MemberSchema.methods.generateAuthToken = function(){
    let token = jwt.sign({email: this.email}, 'memberJwtKey');
    return token;
}
module.exports = mongoose.model('Member', MemberSchema);
