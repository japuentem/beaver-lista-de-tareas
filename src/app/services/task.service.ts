import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private firestore: firebase.firestore.Firestore;

  constructor() {
    const firebaseApp = firebase.initializeApp(environment.firebaseConfig);
    this.firestore = firebaseApp.firestore();
  }

  // Método para obtener la lista de tareas
  getTasks(): Observable<any[]> {
    return new Observable((observer) => {
      this.firestore.collection('tasks').onSnapshot((querySnapshot) => {
        const tasks: any = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        observer.next(tasks);
      });
    });
  }

  // Método para crear una nueva tarea
  createTask(task: any): Promise<any> {
    return this.firestore.collection('tasks').add(task);
  }

  // Método para actualizar una tarea existente
  updateTask(taskId: string, task: any): Promise<any> {
    return this.firestore.collection('tasks').doc(taskId).update(task);
  }

  // Método para eliminar una tarea existente
  deleteTask(taskId: any) {
    console.log(taskId);
    this.firestore
      .collection('tasks')
      .get()
      .then((querySnapshot) => {
        // Iterar sobre los documentos en la colección
        querySnapshot.forEach((doc) => {
          // Loguear el ID y los datos del documento
          if (taskId.id === doc.data()['id']) {
            // tasksRef.doc(doc.id).delete();
            this.firestore.collection('tasks').doc(doc.id).delete();
          }
        });
      })
      .catch((error) => {
        // Manejar errores al obtener la colección
        console.error('Error al obtener la colección:', error);
      });
    // return this.firestore.collection('tasks').doc(taskId).delete();
  }
}
