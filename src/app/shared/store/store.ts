
//Data Model
import { User } from '../../shared/services/model/users';
import { Role } from '../../shared/services/model/roles';

export interface AppState {
  user: User[];
  role:Role[];
}
