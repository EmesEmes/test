import express from 'express'
import { connectDB } from './db/db.js'
import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import authRouter from './routes/auth.router.js'
import orderRouter from './routes/order.router.js'
import commentRouter from './routes/comment.router.js'
// import sendEmail from './utils/send-email.js'


const app = express()
app.use(express.json())
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)
app.use('/comments/', commentRouter)
connectDB()

app.listen(8080, () => {
  console.log('Servidor iniciado en http://localhost:8080');
})

// sendEmail({
//   email: "emilio-delhierro@hotmail.com",
//   subject: "Prueba de envio de correo",
//   text: "Hola, este es un correo de prueba",
// }).then(() => {
//   console.log("Correo enviado");
// }
// ).catch((error) => {
//   console.error("Error al enviar el correo", error);
// }
// )