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
    const secondsLeft: number = Math.floor(Math.random() * 100);
    const responseBody: ResponseBody = {
      payload: {
        secondsLeft
      }
    };

    res.status(200).json(responseBody);
  }, Math.random() * 2000);
}
