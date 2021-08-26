import { User } from 'src/auth/model/user.interface';

export interface Feed {
  id: number;
  body: string;
  createdAt: Date;
  author?: User;
}
