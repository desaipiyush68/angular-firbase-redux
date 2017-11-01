import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { User } from './users';

@Injectable()
export class UserService {
    private basePath: string = '/users';
    Users: FirebaseListObservable<User[]> = null; //  list of objects
    User: FirebaseObjectObservable<User> = null; //   single object
    
    constructor(private db: AngularFireDatabase) { }



    getUsersList(): FirebaseListObservable<User[]> {
        this.Users = this.db.list(this.basePath);
        return this.Users
    }
    // Return a single observable item

    getUser(key: string): FirebaseObjectObservable<User> {
        const userPath = `${this.basePath}/${key}`;
        this.User = this.db.object(userPath)
        return this.User
    }

    createUser(user: User): void {
        this.Users.push(user)
            .catch(error => this.handleError(error))
    }

    // Update an existing User
    updateUser(key: string, value: any): void {
        this.Users.update(key, value)
            .catch(error => this.handleError(error))
    }

    // Deletes a single User
    deleteUser(key: string): void {
        this.Users.remove(key)
            .catch(error => this.handleError(error))
    }

    // Deletes the entire list of Users
    deleteAll(): void {
        this.Users.remove()
            .catch(error => this.handleError(error))
    }

    // Default error handling for all actions
    private handleError(error) {
        console.log(error)
    }

}