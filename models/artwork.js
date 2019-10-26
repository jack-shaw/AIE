let mongoose = require('mongoose');

let ArtworkSchema = new mongoose.Schema({
    art_name: String,
    // art_id: String,
    author: String,
    description: String,
    // art_type: options(),//gif(heic),static photo(分类jpeg,png...),video,audio
    // format: options(),
    // uploadDate: ontimeupdate,//上传时间 不知道这个ontimeupdate是什么
    visit_times: {
        type: Number,
        default : 0
    }
    // // price: String,//分免费和付费 手动设置
    // // buyer: String,//买家信息 from users/purchase_history
    // datasize: onloadedmetadata,//文件大小
    // // status: options()//available或者unavailable

},{collection: 'artworkdb'});
module.exports = mongoose.model('Artwork', ArtworkSchema);