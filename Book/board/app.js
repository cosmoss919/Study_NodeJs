const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const mongodbConnection = require("./configs/mongodb-connection");   // 몽고디비 연결함수
const postService = require("./services/post-service");  //서비스 파일 로딩
const {ObjectId} = require('mongodb');

let collection;

// req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", handlebars.create({ // 템플릿 엔진으로 핸들바 등록
        helpers: require("./configs/handlebars-helpers"),
    }).engine,
);

app.set("view engine", "handlebars");   // 웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("views", __dirname + "/views"); // 뷰 디렉터리를 views로 설정

app.listen(3000, async () => {
    console.log("Server started");
    // mongodbConnection()의 결과는 mongoClient
    const mongoClient = await mongodbConnection();
    // mongoClient.db()로 디비 선택 collection()으로 컬렉션 선택 후 collection에 할당
    collection = mongoClient.db(/*"board" uri에 이미 board라고 해서 생략*/).collection("post");
    console.log("MongoDB connected");
});

// 에러 처리를 위한 공통 함수
const handleError = (res, redirectUrl) => (error) => {
    console.error(error);
    res.redirect(redirectUrl);
};

// 라우터 설정
app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;  //현재 페이지 데이터
    const search = req.query.search || ""; //검색어 데이터
    try {
        // postService.list에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search);

        // 리스트 페이지 렌더링
        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    } catch (e) {
        console.error(e);
        res.render("home", {title: "테스트 게시판"});   // 에러가 나는 경우는 빈 값으로 렌더링
    }
});

//글쓰기 페이지 이동
app.get("/write", (req, res) => {
    res.render("write", {title: "테스트 게시판", mode: "create"});
});

// 글쓰기 API
app.post("/write", async (req, res) => {
    const post = req.body;
    // 글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    // 생성된 도큐먼트의 _id를 사용해 상세 페이지로 이동
    res.redirect(`/detail/${result.insertedId}`);
});

// 수정 페이지로 이동 mode는 modify
app.get("/modify/:id", async (req, res) => {
    // getPostById() 함수로 게시글 데이터를 받아옴
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write", {title: "테스트 게시판", mode: "modify", post});
});

// 게시글 수정 API
app.post("/modify/", async (req, res) => {
    const {id, title, writer, password, content} = req.body;
    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    };
    try {
        await postService.updatePost(collection, id, post);
        res.redirect(`detail/${id}`);
    } catch (e) {
        handleError(res, `detail/${id}`)(e);
    }
});

// 상세 페이지로 이동
app.get("/detail/:id", async (req, res) => {
    try {
        const result = await postService.getDetailPost(collection, req.params.id);
        res.render("detail", {
            title: "테스트 게시판",
            post: result,
        });
    } catch (e) {
        handleError(res, "/")(e);
    }
});

// 패스워드 체크
app.post("/check-password", async (req, res) => {
    const {id, password} = req.body;

    // postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    // 데이터가 있으면 isExist true, 없으면 isExist false
    if (!post) {
        return res.status(404).json({isExist: false});
    } else {
        return res.json({isExist: true});
    }
});

app.delete("/delete", async (req, res) => {
    const {id, password} = req.body;
    try {
        const result = await collection.deleteOne({_id: new ObjectId(id), password: password});
        if (result.deletedCount !== 1) {
            console.log("삭제 실패");
            return res.json({isSuccess: false});
        }
        return res.json({isSuccess: true});
    } catch (e) {
        console.error(e);
        return res.json({isSuccess: false});
    }
});

app.post("/write-comment",async (req, res) => {
    const {id , name, password, comment} = req.body;
    const post = await postService.getPostById(collection, id);

    if(post.comments) {
        post.comments.push({
            idx: post.comments.length - 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    } else {
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ];
    }

    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

app.delete("/delete-comment", async (req, res) => {
    const {id, idx, password} = req.body;
    const post = await collection.findOne(
        {
            _id: new ObjectId(id),
            comments: { $elemMatch: { idx: parseInt(idx), password}},
        },
        postService.projectionOption,
    );

    if(!post) {
        return res.json({isSuccess: false});
    }

    post.comments = post.comments.filter((comment) => comment.idx !== Number(idx));
    postService.updatePost(collection, id, post);
    return res.json({isSuccess: true});
});

