
import { Role } from './roles';

export class User {
  $key: string;
  login: string;
  role: Role;
  timeStamp: number;
}