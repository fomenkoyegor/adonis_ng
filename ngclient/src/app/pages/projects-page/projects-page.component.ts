import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Observable} from 'rxjs';
import {Project} from '../../interfaces/project';
import {Task} from '../../interfaces/task';
import {TasksService} from '../../services/tasks.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsPageComponent implements OnInit {

  public projects$: Observable<Project[]> = null;
  public tasks$: Observable<Task[]> = null;

  constructor(
    private projectsService: ProjectService,
    private tasksService: TasksService
  ) {
  }

  ngOnInit() {
    this.onGetProjects();
    this.onGetTasks();
  }

  public onGetProjects(): void {
    this.projectsService.onGetProjects();
    this.projects$ = this.projectsService.projects$;
  }

  public onGetTasks(): void {
    this.tasks$ = this.tasksService.tasks$;
  }
}
