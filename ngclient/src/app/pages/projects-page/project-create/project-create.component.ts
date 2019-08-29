import {Component, OnInit} from '@angular/core';
import {Project} from '../../../interfaces/project';
import {ProjectService} from '../../../services/project.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  title = new FormControl('', [Validators.required]);

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
  }

  onCreate() {
    const project: Project = {title: this.title.value};
    this.projectService.onAddProject(project);
    this.title.setValue('');
  }
}
