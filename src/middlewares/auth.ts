import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  req.body.user = {
    _id: '65c632e4a4553586862e0653',
  };

  next();
};
