import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainingSchema = new Schema({
  planName: { type: String, required: true },
  date: { type: String, required: true },
  dayOfTheWeek: { type: String, required: true },
  time: { type: String, required: true },
  userId: { type: String, required: true },
  exercisesArr: [
    {
      exercisesName: { type: String, required: true },
      id: { type: Number, required: true },
      seriesData: [
        {
          seriesId: { type: Number, required: true },
          series: { type: Number, required: true },
          weight: { type: Number, required: true },
          repetitions: { type: Number, required: true },
        },
      ],
    },
  ],
});

const Training =
  mongoose.models.Training || mongoose.model('Training', trainingSchema);

export default Training;
