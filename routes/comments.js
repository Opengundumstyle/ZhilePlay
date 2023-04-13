import express from 'express'
import { addComment,deleteComment,editComment,getComment  } from '../controllers/comment.js'
import { verifyToken} from '../verifyToken.js'

const router = express.Router()

router.post("/",verifyToken,addComment)

router.delete("/delete/:id",verifyToken,deleteComment)

router.put("/edit/:id",verifyToken,editComment)

router.get("/:videoId",getComment)


export default router