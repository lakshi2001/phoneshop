import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product'; 
import orderRoutes from './routes/order'; 
import customerRoutes from './routes/customer'; 
import userRoutes from './routes/user'; 
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, 
};
  
app.use(cors(corsOptions));

  
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:auhKBjA03umwrZUQ@cluster0.w8agc.mongodb.net/mobileshop?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} as mongoose.ConnectOptions); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

// Define your routes and controllers here
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from your Node.js backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
