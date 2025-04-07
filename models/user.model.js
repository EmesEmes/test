import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  role: {
    type: String,
    enum: ['user', 'admin', 'author'],
    default: 'user',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  }
});

userSchema.pre("save", async function(next) {
  // hash password
  const user = this

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(user.password, salt)
      next()
    } catch (error) {
      next(error)
    }
  } else {
    next()
  }
})

userSchema.methods.comparePassword = async function(plainTextPassword) {
  const validationResult = await bcrypt.compare(plainTextPassword, this.password)
  return validationResult
}

export const User = mongoose.model('users', userSchema)