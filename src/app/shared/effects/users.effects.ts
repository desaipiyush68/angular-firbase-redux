import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

import * as userActions from '../actions/users.actions';
export type Action = userActions.All;



@Injectable()
export class UserEffects {
  constructor(private actions: Actions, 
              private db: AngularFireDatabase) {}
  
  @Effect() 
  getUserList: Observable<Action> = this.actions.ofType(userActions.GET_USER_LIST)
    .map((action: userActions.GetUserList) => action.payload )
    .mergeMap(payload => this.db.list('/users'))
    .map(payload => {
     return new userActions.GetUserSuccess(payload);
    });
   
  @Effect()
  updateUser: Observable<Action> = this.actions.ofType(userActions.UPDATE_USER)
    .map((action: userActions.UpdateUser) => action.payload )
    .mergeMap(payload => of(this.db.list('/users')
                         .update(payload.$key,payload)))
    .map(() => new userActions.UpdateUserSuccess());


  @Effect()
  createUser: Observable<Action> = this.actions.ofType(userActions.CREAT_USER)
    .map((action: userActions.CreateUser) => action.payload )
    .mergeMap(payload => of(this.db.list('/users').push(payload)))
    .map(() => new userActions.CreateUserSuccess());

    
  @Effect()
  deleteUser: Observable<Action> = this.actions.ofType(userActions.DELETE_USER)
    .map((action: userActions.DeleteUser) => action.payload )
    .mergeMap(payload => of(this.db.list('/users')
                         .remove(payload.$key)))
    .map(() => new userActions.DeleteUserSuccess());

 
}
