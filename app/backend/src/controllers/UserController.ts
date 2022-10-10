import { Request, Response } from 'express';
import { IUserService } from '../interfaces/User';

export default class UserController {
  constructor(private userService: IUserService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.userService.tryLogin({email, password});
    return res.status(200).json({ token: result });
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    await this.userService.create({ name, email, password});
    return res.status(201).end();
  }
}