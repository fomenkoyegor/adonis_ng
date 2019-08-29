import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../interfaces/task';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly url = '/api/projects/';
  public tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(
    private http: HttpClient,
    private message: MessageService
  ) {

  }

  private getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}${projectId}/tasks`);
  }

  public onGetTasks(projectId: number): void {
    this.getTasks(projectId).subscribe((tasks: Task[]) => this.tasks$.next(tasks));
  }

  private addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}${task.project_id}/tasks`, task);
  }

  public onAddTask(task: Task): void {
    this.addTask(task).subscribe((newTask: Task) => {
      const tasks: Task[] = this.tasks$.value;
      tasks.unshift(newTask);
      this.tasks$.next(tasks);
      this.message.send(`add task`, newTask.description);
    });
  }

  private updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(`/api/tasks/${task.id}`, task);
  }

  public onUpdateTask(task: Task): void {
    this.updateTask(task).subscribe((taskUpdated: Task) => {
      const tasks: Task[] = this.tasks$.value;
      const updatedTasks = tasks.map(t => t.id === taskUpdated.id ? taskUpdated : t);
      this.tasks$.next(updatedTasks);
      this.message.send(`edit task`, taskUpdated.description);
    });
  }

  private deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`/api/tasks/${task.id}`);
  }

  public onDeleteTask(task: Task): void {
    this.deleteTask(task).subscribe((deletedTask: Task) => {
      const oldTasks: Task[] = this.tasks$.value;
      const newTasks = oldTasks.filter(t => t.id !== deletedTask.id);
      this.tasks$.next(newTasks);
      this.message.send(`delete task`, deletedTask.description);
    });
  }
}
