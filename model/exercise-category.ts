import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorieSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  alt: { type: String, required: true },
  src: { type: String, required: true },
  link: { type: String, required: true },
});

const Categorie =
  mongoose.models.Categorie || mongoose.model('Categorie', categorieSchema);

export default Categorie;
