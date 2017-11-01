import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Observable } from 'rxjs/Observable';

//firebase 
import * as firebase from 'firebase/app';
import { FirebaseListObservable } from 'angularfire2/database';

//User Service
import { UserService } from '../../shared/services/model/users.service';
import { RoleService } from '../../shared/services/model/roles.service';
import { User } from '../../shared/services/model/users';
import { Role } from '../../shared/services/model/roles';

//Model
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";



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
    user:User = new User();
    role:Role ;
    selectedRole:Role;
    crUser:boolean;
    upUser:boolean;
    login:any;
    user$: Observable<User[]>;
    constructor(private userService: UserService,
                private roleService: RoleService,
                private modalService: NgbModal,
                private fb: FormBuilder
               ) {   
    }

    ngOnInit() {

        let users = this.userService.getUsersList();
        users.subscribe(user=>{
            this.Users = user;
        });
       
      
        let roles =  this.roleService.getRolesList();
        
        roles.subscribe(role=>{
            this.Roles = role;
            let selectedrole = this.Roles[0];
            this.selectedRole = selectedrole;
        });
        
        this.crUser = true;
        this.upUser = false;
        
      
    }
    
    createUser() {

        const val = this.form.value;
        let date = new Date().getTime();
        this.user.login = val.login;
        this.user.role = val.role;
        this.user.timeStamp = date;
        this.userService.createUser(this.user);
        this.user = new User();
        
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

  
  
    



    updateUserModel(user:User,content){

        this.crUser = false;
        this.upUser = true;
    
        this.form = this.fb.group({
            login: [user.login, Validators.required],
            role:[user.role, Validators.required]
        });
        
        let role =  this.Roles.find(x => x.roleName == user.role.roleName);
        this.selectedRole = role;
        this.user = user;
        
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
        this.user.login = val.login;
        this.user.role = val.role;
        this.user.timeStamp = date;
        this.userService.updateUser(this.user.$key,this.user);
        this.user = new User(); 
    }
    
    deleteUserModel(user,deletecontent) {

        this.user = user;
        //Open Model
        this.modalService.open(deletecontent).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }

    deleteUser(){
        this.userService.deleteUser(this.user.$key);
    }

    deleteUsers() {
        this.userService.deleteAll();
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


