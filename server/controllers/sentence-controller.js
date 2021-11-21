import SentenceService from "../service/sentence-service.js";
// import { ApiError } from "../exceptions/api-error.js";

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
  async editSentence(req, res, next) {
    try {
      const { newText, id } = req.body;
      const sentence = await SentenceService.editSentence(newText, id);
      return res.json(sentence);
    } catch (error) {
      next(error);
    }
  }
  async deleteSentence(req, res, next) {
    try {
      const { id } = req.body;
      const sentence = await SentenceService.deleteSentence(id);
      return res.json(sentence);
    } catch (error) {
      next(error);
    }
  }
}

export default new SentenceController();
