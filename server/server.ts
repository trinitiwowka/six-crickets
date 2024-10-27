import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getDeadline } from './deadline.route';

const app: Application = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.route('/api/deadline').get(getDeadline);

const httpServer: any = app.listen(9000, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});
