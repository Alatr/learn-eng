import SentenceModel from "../models/sentence-model.js";
import SentenceDto from "../dtos/sentence-dto.js";
import { ApiError } from "../exceptions/api-error.js";

class SentenceService {
  async getAllSentences() {
    const sentences = await SentenceModel.find();
    return sentences.map((sentence) => new SentenceDto(sentence));
  }
  async addSentence(text) {
    const sentence = await SentenceModel.create({
      text,
    });
    const sentenceDto = new SentenceDto(sentence);
    return sentenceDto;
  }
}

export default new SentenceService();
