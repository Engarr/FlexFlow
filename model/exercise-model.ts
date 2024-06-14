import mongoose from 'mongoose';


const { Schema } = mongoose;

const exerciseSchema = new Schema({
  exerciseName: { type: String, required: true },
  category: { type: String, required: true },
  muscle1: { type: [String], required: true },
  muscle2: { type: [String] },
  imageUrl: { type: String, required: true },
  videoUrl: { type: [String], required: true },
  link: { type: String, required: true },
});

const Exercise =
  mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema);

export default Exercise;
