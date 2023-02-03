import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from './routes/UserRouter';
import productRouter from './routes/ProductRouter';
import saleRouter from './routes/SaleRouter';
import saleProductRouter from './routes/SaleProductRouter';
import errorHandler from './middlewares/error';
import Token from './token/generateJWT';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', saleRouter);
app.use('/', saleProductRouter);
app.use('/images', express.static(path.join('public', 'images')));
app.post('/validate', async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const response = Token.validateToken(authorization as string);
    if (response && response.type === 'authentication') {
      return res.status(200).json({ result: true, role: response.role });
    }
    return res.status(500).end();
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line sonarjs/no-unused-collection
const users = [];

io.on('connection', (socket) => {
  socket.on('join_room', (userId, orderId) => {
    socket.join(orderId);
    users.push({ socketId: socket.id, userId });
  });

  socket.on('update_status', (orderId, status) => {
    console.log(status);
    io.to(orderId).emit('status_updated', status);
  });
});

app.get('/teste', (req, res) => res.send('okay'));

app.use(errorHandler);

export default serverHttp;
