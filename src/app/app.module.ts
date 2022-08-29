import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import { AppComponent } from './app.component';
import { CreateComponent } from './questions/create/create.component';
import { EditComponent } from './questions/edit/edit.component';
import { ListComponent } from './questions/list/list.component';
import { ManagementComponent } from './questions/management/management.component';
import { AppRoutingModule } from "./app-routing.module";
import { MenuComponent } from './shared/menu/menu.component';
import {SingleSelectQuestion} from "./questions/list/single-select-question/single-select-question.component";
import {OpenQuestion} from "./questions/list/open-question/open-question.component";
import {MultipleSelectQuestion} from "./questions/list/multiple-select-question/multiple-select-question.component";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
    declarations: [
        AppComponent,
        CreateComponent,
        EditComponent,
        ListComponent,
        ManagementComponent,
        MenuComponent,
        SingleSelectQuestion,
        OpenQuestion,
        MultipleSelectQuestion,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatRadioModule,
        FormsModule
    ],
    exports: [
        BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatRadioModule,
        FormsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
