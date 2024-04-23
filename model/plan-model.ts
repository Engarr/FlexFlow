import mongoose from 'mongoose';

const { Schema } = mongoose;

const planSchema = new Schema({
  planName: { type: String, required: true },
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
export default mongoose.model('Plan', planSchema);
