import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  req.body.user = {
    _id: '65c1662274ad2b2fc3ef6c05',
  };

  next();
};
