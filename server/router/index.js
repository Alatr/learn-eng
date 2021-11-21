import { Router } from "express";
import SentenceController from "../controllers/sentence-controller.js";

const router = new Router();
// import { body } from "express-validator";

router.get("/sentences", SentenceController.sentences);
router.post("/add_sentence", SentenceController.addSentence);
router.post("/edit_sentence", SentenceController.editSentence);
router.delete("/delete_sentence", SentenceController.deleteSentence);

export default router;
