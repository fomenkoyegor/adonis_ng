import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../interfaces/task';
import {TasksService} from '../../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  public isEdit: boolean;
  public newDescription: string;

  constructor(private taskService: TasksService) {
  }

  ngOnInit() {
  }

  public onDelete(): void {
    this.taskService.onDeleteTask(this.task);
  }

  public onUpdate(complited: boolean = null): void {
    if (complited) {
      this.task.complited = !this.task.complited;
    }
    this.taskService.onUpdateTask(this.task);
  }

  public onEdit(): void {
    this.isEdit = true;
    this.newDescription = this.task.description;
  }

  public onCancel(): void {
    this.isEdit = false;
  }

  public onSave(): void {
    this.task.description = this.newDescription;
    this.onUpdate();
    this.isEdit = false;
  }
}
