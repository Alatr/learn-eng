import SentenceModel from "../models/sentence-model.js";
import SentenceDto from "../dtos/sentence-dto.js";
// import { ApiError } from "../exceptions/api-error.js";

class SentenceService {
  async getAllSentences() {
    const sentences = await SentenceModel.find();
    return sentences.map((sentence) => new SentenceDto(sentence));
  }

  async addSentence(text) {
    const sentence = await SentenceModel.create({
      text,
    });

    return new SentenceDto(sentence);
  }

  async editSentence(newText, id) {
    const sentence = await SentenceModel.findOneAndUpdate(
      { _id: id },
      { text: newText },
      { new: true }
    );
    if (!sentence) {
      throw newError("sentence was not found");
    }
    return new SentenceDto(sentence);
  }
  async deleteSentence(id) {
    const sentence = await SentenceModel.findOneAndDelete({ _id: id });
    if (!sentence) {
      throw newError("sentence was not found");
    }
    return await this.getAllSentences();
  }
}

export default new SentenceService();
