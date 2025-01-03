import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  // this refers to the user, so when calling User.create in controller
  // it will refer there, so here if password not modified it will just proceed to
  // next middleware
  const user = this;
  // Can console this which will give all values provided by user
  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
