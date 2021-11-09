class SentenceDto {
  text;
  id;
  constructor(model) {
    this.text = model.text;
    this.id = model._id;
  }
}

export default SentenceDto;
