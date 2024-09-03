const { MongoClient } = require('mongodb');

// MongoDB 연결 정보
const url = "mongodb+srv://najin:SKwls123@cluster0.yu0zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url);

async function run() {  //async가 있으므로 비동기 처리 함수
    await client.connect();
    const adminDB = client.db('test').admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
    return "OK";
}

run()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());