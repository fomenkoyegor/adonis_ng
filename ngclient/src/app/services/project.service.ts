import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Project} from '../interfaces/project';
import {TasksService} from './tasks.service';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly url = '/api/projects/';
  public projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  public selected: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);

  constructor(
    private http: HttpClient,
    private tasksService: TasksService,
    private message: MessageService
  ) {

  }

  public onSelected(project: Project) {
    this.selected.next(project);
  }

  public onGetProjects(): void {
    this.getProjects().subscribe((projects: Project[]) => this.projects$.next(projects));
  }

  private getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  private addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }

  public onAddProject(project: Project): void {
    this.addProject(project).subscribe((newProject: Project) => {
      const projects: Project[] = this.projects$.value;
      projects.unshift(newProject);
      this.projects$.next(projects);
      this.message.send(`add new project`, newProject.title);
    });
  }

  private onDeleteProject(project: Project): Observable<Project> {
    return this.http.delete<Project>(`${this.url}${project.id}`);
  }

  public deleteProject(project: Project): void {
    this.onDeleteProject(project).subscribe((oldProject: Project) => {
      const oldProjects: Project[] = this.projects$.value;
      const newProjects = oldProjects.filter(p => p.id !== oldProject.id);
      this.projects$.next(newProjects);
      this.tasksService.tasks$.next([]);
      this.message.send(`delete project`, oldProject.title);
    });
  }

  private onUpdateProject(project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.url}${project.id}`, project);
  }

  public updateProject(project: Project): void {
    this.onUpdateProject(project).subscribe((updatedProject: Project) => {
      const projects: Project[] = this.projects$.value;
      const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
      this.projects$.next(updatedProjects);
      this.message.send(`edit project`, updatedProject.title);
    });
  }


}
