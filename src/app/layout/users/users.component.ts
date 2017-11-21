import { Component, OnInit,Pipe,PipeTransform } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';
//firebase 
import * as firebase from 'firebase/app';
import { FirebaseListObservable } from 'angularfire2/database';
//Data Model
import { User } from '../../shared/services/model/users';
import { Role } from '../../shared/services/model/roles';


//Model
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
//ngrx
import * as userActions from '../../shared/actions/users.actions';
import * as roleActions from '../../shared/actions/roles.actions';
//store 
import { Store }        from '@ngrx/store';
import { AppState } from '../../shared/store/store';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})

export class UsersComponent implements OnInit {

    Users: User[];
    Roles:Role[];
    form: FormGroup;
    closeResult: string;
    role:Role ;
    selectedRole:Role;
    crUser:boolean;
    upUser:boolean;
    login:any;
    user$: Observable<any>;
    role$:Observable<any>;
    usr:User = new User();
    p: number = 1;
    constructor(
                private modalService: NgbModal,
                private fb: FormBuilder,
                private store: Store<AppState>
               ) {   
             this.user$ = this.store.select('user'); 
             this.role$ = this.store.select('role');  
               
    }

    ngOnInit() {

        this.store.dispatch(new userActions.GetUserList())
        this.user$.subscribe(data =>{
           this.Users = data.user;        
        })

        this.store.dispatch(new roleActions.GetRoleList())
        this.role$.subscribe(data =>{
           this.Roles = data.role;
           let selectedrole = this.Roles[0];
           this.selectedRole = selectedrole;        
        })

        this.crUser = true;
        this.upUser = false;
        
     }
    
     createUser() {

        const val = this.form.value;
        let date = new Date().getTime();
        this.usr.login = val.login;
        this.usr.role = val.role;
        this.usr.timeStamp = date;
        this.store.dispatch(new userActions.CreateUser(this.usr))
        this.usr = new User();
        
     }

     createUserModel(content) {

        //Initaite form
        this.form = this.fb.group({
            login: ['', Validators.required],
            role:['', Validators.required]
        });

        let selectedrole = this.Roles[0];
        this.selectedRole = selectedrole;

        //Open Model
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
     }

  
  
    



    updateUserModel(upUsr:User,content){

        this.crUser = false;
        this.upUser = true;
        this.form = this.fb.group({
            login: [upUsr.login, Validators.required],
            role:[upUsr.role, Validators.required]
        });
        
        let role =  this.Roles.find(x => x.roleName == upUsr.role.roleName);
        this.selectedRole = role;
        this.usr = upUsr;
        
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.crUser = true;
            this.upUser = false;
           
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.crUser = true;
            this.upUser = false;
           
        });
    }
    
     updateUser(){

         const val = this.form.value;
         let date = new Date().getTime();
         this.usr.login = val.login;
         this.usr.role = val.role;
         this.usr.timeStamp = date;
          this.store.dispatch(new userActions.UpdateUser(this.usr));
          this.usr = new User(); 
     }
    
    deleteUserModel(deleteUser,deletecontent) {

        this.usr = deleteUser;
        //Open Model
        this.modalService.open(deletecontent).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }

    deleteUser(){
       this.store.dispatch(new userActions.DeleteUser(this.usr));
    }



    isNotempty() {
        const val = this.form.value;
        return val && val.login && val.role
    }

    private getDismissReason(reason: any): string {

        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}


