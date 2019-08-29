'use strict';
const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthorizationService = use('App/Services/AuthorizationService');

class TaskController {

  async index({auth, params}) {
    const user = await auth.getUser();
    const {id} = params;
    const project = await Project.find(id);
    AuthorizationService.verifyPermision(project, user);
    return await project.tasks().orderBy('created_at','desc').fetch();
  }


  async create({request, auth, params}) {
    const user = await auth.getUser();
    const {description} = request.all();
    const {id} = params;
    const project = await Project.find(id);
    AuthorizationService.verifyPermision(project, user);
    const task = new Task();
    task.fill({description});
    await project.tasks().save(task);
    return task;
  }


  async destroy({request, auth, params, response}) {
    const user = await auth.getUser();
    const {id} = params;
    const task = await Task.find(id);
    const project = await task.project().fetch();
    AuthorizationService.verifyPermision(project, user);
    await task.delete();
    return task;
  }


  async update({request, auth, params}) {
    const user = await auth.getUser();
    const {id} = params;
    const task = await Task.find(id);
    const project = await task.project().fetch();
    AuthorizationService.verifyPermision(project, user);
    task.merge(request.only([
      'description',
      'complited',
    ]));
    await task.save();
    return task;

  }


}

module.exports = TaskController;
