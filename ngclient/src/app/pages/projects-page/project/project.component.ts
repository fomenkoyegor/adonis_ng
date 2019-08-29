import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../interfaces/project';
import {TasksService} from '../../../services/tasks.service';
import {ProjectService} from '../../../services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  public selectedProject: Project;
  public isEdit: boolean;
  public newTitle: string;

  constructor(private tasksService: TasksService, private projectService: ProjectService) {
  }

  ngOnInit() {
    this.projectService.selected.subscribe(project => {
      this.selectedProject = project;
    });
  }

  public onSelect(project: Project): void {
    this.tasksService.onGetTasks(project.id);
    this.projectService.onSelected(project);
  }

  public onDelete(event, project: Project): void {
    event.stopPropagation();
    this.projectService.deleteProject(project);
  }

  public onEdit(): void {
    this.isEdit = true;
    this.newTitle = this.project.title;
  }

  public onSave(): void {
    this.project.title = this.newTitle;
    this.projectService.updateProject(this.project);
    this.isEdit = false;
  }

  public onCancel(): void {
    this.isEdit = false;
  }


}
