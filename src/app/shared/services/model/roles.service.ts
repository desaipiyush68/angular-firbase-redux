import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Role } from './roles';

@Injectable()
export class RoleService {
    private basePath: string = '/roles';
    Roles: FirebaseListObservable<Role[]> = null; //  list of objects
    Role: FirebaseObjectObservable<Role> = null; //   single object
    constructor(private db: AngularFireDatabase) {
    }
    
    getRolesList(): FirebaseListObservable<Role[]> {
        this.Roles = this.db.list(this.basePath);
        return this.Roles
    }

   // getRole(key: string): FirebaseObjectObservable<Role> {
   //     const rolePath = `${this.basePath}/${key}`;
   //     this.Role = this.db.object(rolePath);
   //     return this.Role
   // }

    createRole(role: Role): void {
        this.Roles.push(role)
            .catch(error => this.handleError(error))
    }

    // Update an existing item
    updateRole(key: string, value: any): void {
        this.Roles.update(key, value)
            .catch(error => this.handleError(error))
    }
    // Deletes a single item
    deleteRole(key: string): void {
        this.Roles.remove(key)
            .catch(error => this.handleError(error))
    }

    // Deletes the entire list of items
    deleteAll(): void {
        this.Roles.remove()
            .catch(error => this.handleError(error))
    }

    // Default error handling for all actions
    private handleError(error) {
        console.log(error)
    }

}