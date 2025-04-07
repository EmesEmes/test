import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El titulo del producto es obligatorio"],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: [5, "La descripcion debe tener al menos 5 caracteres"],
    maxlength: [100, "La descripcion debe tener menos de 100 caracteres"]
  },
  price: {
    type: Number,
    required: [true, "El precio de producto es obligatorio"],
    min: [0, "el precio no pudee ser negativo"],
    max: [10000, "El precio no puede ser mayor a 10000"]
  },
  category: {
    type: String,
    enum: ["tecnologia", "ropa", "muebles", "comida"],
    required: [true, "La cateegoria del producto es obligatorio"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Product = mongoose.model("products", productSchema)