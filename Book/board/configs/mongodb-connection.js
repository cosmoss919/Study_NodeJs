const { MongoClient } = require('mongodb');
// 몽고디비 연결 주소
const uri = "mongodb+srv://najin:SKwls123@cluster0.yu0zg.mongodb.net/?ssl=true&retryWrites=true&w=majority&appName=Cluster0/board";

module.exports = function (callback) {  // 몽고디비 커넥션 연결 함수 반환
    return MongoClient.connect(uri, callback);
};