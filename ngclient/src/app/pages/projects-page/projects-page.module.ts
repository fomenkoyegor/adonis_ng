import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsPageRoutingModule } from './projects-page-routing.module';
import { ProjectsPageComponent } from './projects-page.component';
import { ProjectComponent } from './project/project.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskComponent } from './task/task.component';
import {MaterialModule} from '../../material/material.module';

@NgModule({
  declarations: [ProjectsPageComponent, ProjectComponent, ProjectCreateComponent, TaskCreateComponent, TaskComponent],
  imports: [
    CommonModule,
    ProjectsPageRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProjectsPageModule { }
