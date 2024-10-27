import {Request, Response} from 'express';
import {setTimeout} from "timers";

interface Payload {
  secondsLeft: number;
}

interface ResponseBody {
  payload: Payload;
}

export function getDeadline(req: Request, res: Response): void {
  setTimeout(() => {
    const randomTime: number = Math.floor(Math.random() * 100);
    const responseBody: ResponseBody = {
      payload: {
        secondsLeft: randomTime
      }
    };

    res.status(200).json(responseBody);
  }, 1000);
}
