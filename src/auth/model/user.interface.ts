import { Feed } from 'src/feed/model/post.interface';
import { Role } from './role.enum';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: Role;
  posts?: Feed[];
}
