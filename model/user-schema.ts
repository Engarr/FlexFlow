import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  favorites: [
    {
      type: String,
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
