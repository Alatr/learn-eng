import mongoosePkg from "mongoose";
const { Schema, model } = mongoosePkg;

const SentenceSchema = new Schema({
  text: { type: String, required: true },
});

export default model("Sentence", SentenceSchema);
