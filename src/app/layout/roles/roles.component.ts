import { Component, OnInit } from '@angular/core';
import { Role } from '../../shared/services/model/roles';
import { RoleService } from '../../shared/services/model/roles.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-roles-page',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    animations: [routerTransition()]
})

export class RolesPageComponent implements OnInit {

    Roles: Role[];
    closeResult: string;
    form: FormGroup;
    role: Role = new Role();
    crRole:boolean;
    upRole:boolean;
    
    constructor(
        private rolesService: RoleService,
        private modalService: NgbModal,
        private fb: FormBuilder) {

    }

    ngOnInit() {

        let roles  = this.rolesService.getRolesList();
        roles.subscribe(role => {
            this.Roles = role;
        });

        this.crRole = true;
        this.upRole = false;
    }

    createRole() {

        const val = this.form.value;
        let date = new Date().getTime();
        this.role.roleName = val.roleName;
        this.role.timeStamp = date;
        this.rolesService.createRole(this.role);
        this.role = new Role();
    }
   
    createRoleModel(content) {
        
        this.form = this.fb.group({
            roleName: ['', Validators.required]
        });

        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    

    updateRole() {

        const val = this.form.value;
        let date = new Date().getTime();
        this.role.roleName = val.roleName;
        this.role.timeStamp = date;
        this.rolesService.updateRole(this.role.$key, this.role);
        this.role = new Role();

    }

    

    updateRoleModel(role,content) {

        this.crRole = false;
        this.upRole = true;
        this.role = role;
        this.form = this.fb.group({
            roleName: [role.roleName, Validators.required]
        });

        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            this.crRole = true;
            this.upRole = false;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.crRole = true;
            this.upRole = false;
        });
    }
    
    deleteRoleModel(role,deletecontent) {

        this.role = role;
        this.form = this.fb.group({
            roleName: ['', Validators.required]
        });

        this.modalService.open(deletecontent).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }
    
    
    deleteRole() {
        
        this.rolesService.deleteRole(this.role.$key);
    }

    deleteRoles() {
        this.rolesService.deleteAll();
    }

    isNotempty() {
        const val = this.form.value;
        return val && val.roleName;
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
