import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as roleActions from '../actions/roles.actions';
import { RoleService } from '../services/model/roles.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

export type Action = roleActions.All;


@Injectable()

export class RoleEffects {
  constructor(private actions: Actions, private db: AngularFireDatabase) {}

  @Effect()
  getRoleList: Observable<Action> = this.actions.ofType(roleActions.GET_ROLE_LIST)
    .map((action: roleActions.GetRoleList) => action.payload )
    .mergeMap(payload => this.db.list('/roles'))
    .map(role => {
      return new roleActions.GetRoleListSuccess(role);
    });

  @Effect()
  updateRole: Observable<Action> = this.actions.ofType(roleActions.UPDATE_ROLE)
    .map((action: roleActions.UpdateRole) => action.payload )
    .mergeMap(payload => of(this.db.list('/roles')
                         .update(payload.$key , payload)))
    .map(() => new roleActions.UpdateRoleSuccess());

  @Effect()
  createRole: Observable<Action> = this.actions.ofType(roleActions.CREAT_ROLE)
    .map((action: roleActions.CreateRole) => action.payload )
    .mergeMap(payload => of(this.db.list('/roles')
                         .push(payload)))
    .map(() => new roleActions.CreateRoleSuccess());
    
  @Effect()
  deleteRole: Observable<Action> = this.actions.ofType(roleActions.DELETE_ROLE)
    .map((action: roleActions.CreateRole) => action.payload )
    .mergeMap(payload => of(this.db.list('/roles')
                         .remove(payload.$key)))
    .map(() => new roleActions.DeleteRoleSuccess()); 

}
