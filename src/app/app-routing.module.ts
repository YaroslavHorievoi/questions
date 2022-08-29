import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ManagementComponent} from "./questions/management/management.component";
import {CreateComponent} from "./questions/create/create.component";
import {EditComponent} from "./questions/edit/edit.component";
import {ListComponent} from "./questions/list/list.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'management',
    },
    {
        path: 'management',
        component: ManagementComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
        data: { isEdit: false }
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        data: { isEdit: true }
    },
    {
        path: 'list',
        component: ListComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {}
