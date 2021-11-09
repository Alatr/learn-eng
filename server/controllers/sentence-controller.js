import cookie from "cookie";
import SentenceService from "../service/sentence-service.js";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/api-error.js";
import userModel from "../models/user-model.js";

class SentenceController {
  async sentences(req, res, next) {
    try {
      const sentences = await SentenceService.getAllSentences();
      return res.json(sentences);
    } catch (error) {
      next(error);
    }
  }
  async addSentence(req, res, next) {
    try {
      const { text } = req.body;
      const sentence = await SentenceService.addSentence(text);
      return res.json(sentence);
    } catch (error) {
      next(error);
    }
  }
}

export default new SentenceController();
