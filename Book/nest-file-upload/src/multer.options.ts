import { randomUUID } from 'crypto';
import { diskStorage } from "multer";
import { extname, join } from "path";

export const multerOptions = {
    storage: diskStorage({
        destination: join(__dirname, '..', 'uploads'),  // 파일 저장 경로 설정
        filename: (req, file, cb) => {    // 파일명 설정
            cb(null, randomUUID() + extname(file.originalname));
        },
    }),
}