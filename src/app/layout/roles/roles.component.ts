import { Component, OnInit } from '@angular/core';
import { Role } from '../../shared/services/model/roles';
import { FirebaseListObservable } from 'angularfire2/database';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

//ngrx
import * as roleActions from '../../shared/actions/roles.actions';
//store
import { Store }        from '@ngrx/store'; 
import { AppState } from '../../shared/store/store';

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
    role$:Observable<any>;
    p: number = 1;
    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private store: Store<AppState>) {
        this.role$ = this.store.select('role'); 
    }

    ngOnInit() {

        this.store.dispatch(new roleActions.GetRoleList())
        this.role$.subscribe(data =>{
           this.Roles = data.role;        
        })
        
        this.crRole = true;
        this.upRole = false;
    }

    createRole() {

        const val = this.form.value;
        let date = new Date().getTime();
        this.role.roleName = val.roleName;
        this.role.timeStamp = date;
        this.store.dispatch(new roleActions.CreateRole(this.role))
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
        this.store.dispatch(new roleActions.UpdateRole(this.role))
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
        
        this.store.dispatch(new roleActions.DeleteRole(this.role))
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
