import express from 'express';
import 'dotenv/config';
import paymentRoutes from './routes/payment';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

const app = express();
const port = 5000;

declare global {
  namespace Express {
    interface Request {
      rawBody?: string;
    }
  }
}

app.use(
  express.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
      const url = req.originalUrl;
      if (url.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

app.use('/payments', paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
