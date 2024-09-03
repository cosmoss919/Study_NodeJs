const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const mongodbConnection = require("./configs/mongodb-connection");   // 몽고디비 연결함수

app.engine("handlebars", handlebars.engine());  // 템플릿 엔진으로 핸들바 등록
app.set("view engine", "handlebars");   // 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉터리를 views로 설정

// 라우터 설정
app.get("/", (req, res) => {
   res.render("home", { title: "테스트 게시판"});
});

app.get("/write", (req, res) => {
   res.render("write", {title: "테스트 게시판"});
});

app.get("/detail/:id", (req, res) => {
   res.render("detail", {title: "테스트 게시판"});
});

let collection;
app.listen(3000, async () => {
   console.log("Server started");
   // mongodbConnection()의 결과는 mongoClient
   const mongoClient = await mongodbConnection();
   // mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
   collection = mongoClient.db(/*"board" uri에 이미 board라고 해서 생략*/).collection("post");
   console.log("MongoDB connected");
});