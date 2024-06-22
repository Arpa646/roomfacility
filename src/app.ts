import cors from 'cors';
import express, { Application,NextFunction, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';

import router from './app/route/intex';
import notFound from './app/middleware/notFound';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api',router);


const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);


//app.use(globalErrorHandler)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Not Found',
  });
});



export default app;
