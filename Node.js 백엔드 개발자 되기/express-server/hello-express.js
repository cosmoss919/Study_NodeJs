const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (_, res) => res.end("HOME"));
app.get("/user", user);
app.get("/feed", feed);

app.listen(port, () => {
   console.log(`익스프레스로 라우터 리팩터링 하기`);
});

function user(req, res) {
    const userInfo = url.parse(req.url, true).query;
    res.json(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
};

function feed(req, res) {
    res.json(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>`);
};