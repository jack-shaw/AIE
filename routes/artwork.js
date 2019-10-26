const mongoose = require('mongoose');
let Artwork = require('../models/artwork');
let express = require('express');
let router = express.Router();



router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Artwork.find(function(err, artwork) {
        console.log(artwork);
        if (err)
            res.send(err);

        res.send(JSON.stringify(artwork,null,5));
    });
}
//function自动生成规定格式的art_id

router.findOne = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Artwork.find({ "_id" : req.params.id },function(err, artwork) {
        if (err)
            res.json({ message: 'Artwork NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(artwork,null,5));
    });
}
// function getTotalArtwork(array) {
//     let totalArtwork = 0;
//     array.forEach(function(obj) { totalArtwork = db.artworkdb.find().count(); });
//     return totalArtwork;
// }
// router.findTotalArtwork = (req, res) => {
//
//     Artwork.find(function(err, artwork) {
//         if (err)
//             res.send(err);
//         else
//             res.json({ totalartwork : getTotalArtwork(artwork) });
//     });
// }

router.addArtwork = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var artwork = new Artwork();
    // artwork.art_id = req.body.art_id;
    artwork.art_name = req.body.art_name;
    artwork.author = req.body.author;
    artwork.description = req.body.description;
    // artwork.price = req.body.price;
    // artwork.uploadDate = req.body.uploadDate;
    artwork.view_times = req.body.view_times;
    // artwork.art_type = req.body.art_type;
    // artwork.format = req.body.format;
    // artwork.buyer = req.body.buyer;
    // artwork.datasize = req.body.datasize;

    artwork.save(function(err) {
        if (err)
            res.json({ message: 'Artwork NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Artwork Successfully Added!', data: artwork });
    });
}

router.removeArtwork = (req, res) => {
    Artwork.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.json({message:'Artwork Not Deleted!', errmsg: err});
        else
            res.json({message:'Artwork Successfully Deleted!'});
    });
}

router.updateViewTimes = (req, res) => {

    Artwork.findById(req.params.id,function(err, artwork) {
        if (err)
            res.json({message: 'Artwork NOT Found!', errmsg: err});
        else
            artwork.view_times += 1;
            artwork.save(function (err) {
            if (err)
                res.send(err);
            else
                res.json({message: "Updated Successfully!", data: artwork});
        });

    });



};


function getViewTimes(array) {
    let sumOfViewTimes = 0;
    array.forEach(function(obj) { sumOfViewTimes += obj.view_times; });
    return sumOfViewTimes;
}
router.findSumOfViewTimes = (req, res) => {

    let viewtimes = getViewTimes(artwork);
    res.json({totalviewtimes : viewtimes});
}
function fuzzyQuery(list, keyWord) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].split(keyWord).length > 1) {
            arr.push(list[i]);
        }
    }
    return arr;
}
router.fuzzySearch = (req, res) => {
    Artwork.find(function(err, artwork){
        if(err)
            res.send(err);
        else
            res.json({fuzzysearch : fuzzyQuery(keyWord)})
    })
}




// // router.alterPrice = (req, res) => {
// //     //post
// // }
// router.checkDetails = (req, res) => {
//     //查art_name/art_id返回artwork里所有信息
//     //get方法
// }
// router.updateViewTimes = (req, res) => {
//     //user每点击一次图片记录一次点击（up vote）
//     //function onclick
//     //put方法
// }
// router.returnSize = (req, res) => {
//     //返回图片大小
//     //function readSize
//     //get方法
// }
// router.addBuyer = (req, res) => {
//     //将null改成某个user的名字，同时要保证这个用户已经在数据库里才能购买
//     //从model/user/purchase_history里调用已购买作品的编号，看这个编号是否和这作品符合
//     //符合即add buyer
//     //被购买之后要将artwork设置成unavailable状态
//     //put
// }
// router.makeArtworkBoughtUnavailable = (req, res) => {
//     //set 已购买的商品status为unavailable
//     //put
// }

module.exports = router;