import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {
  taskList: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.taskList = tasks.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          date: task.date,
          color: task.color,
        };
      });
    });
  }

  // Método para formatear la fecha
  formatDate(date: any): string {
    const dateObj = new Date(date.seconds * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(
      dateObj
    );

    return formattedDate;
  }

  // Método para borrar un elemento de la lista y de firebase
  onDelete(task: any) {
    this.taskService.deleteTask(task);
  }

  // Método para obtener la lista de tareas
  getTasks() {
    this.taskService.getTasks().subscribe((tasks: string[]) => {
      this.taskList = tasks;
    });
  }
  // Método para recargar la lista de tareas cada vez que se active la página
  ionViewWillEnter() {
    this.getTasks();
  }
}
