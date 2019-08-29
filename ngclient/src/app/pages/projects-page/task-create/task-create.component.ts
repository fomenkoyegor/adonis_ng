import {Component, OnInit} from '@angular/core';
import {Project} from '../../../interfaces/project';
import {Task} from '../../../interfaces/task';
import {Observable} from 'rxjs';
import {ProjectService} from '../../../services/project.service';
import {TasksService} from '../../../services/tasks.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  public selectedProject$: Observable<Project>;
  description = new FormControl('', [Validators.required]);

  constructor(private projectService: ProjectService, private taskService: TasksService) {
  }

  ngOnInit() {
    this.onSelectedProject();
  }

  private onSelectedProject(): void {
    this.selectedProject$ = this.projectService.selected;
  }

  public onCreate(selectedProject: Project): void {
    const task: Task = {description: this.description.value, project_id: selectedProject.id};
    this.taskService.onAddTask(task);
    this.description.setValue(null);
  }
}
