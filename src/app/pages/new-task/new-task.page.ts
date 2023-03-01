import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { environment } from '../../../environments/environment'; // Importar environment
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ColorPickerPage } from '../../color-picker/color-picker.page';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  // Declarar las variables para los campos del formulario
  titulo?: string;
  descripcion?: string;
  fecha?: string;
  selectedColor: string = '#ffffff'; // color por defecto

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  // Método que se llama al hacer clic en el botón ion-fab-button
  saveTask() {
    firebase.initializeApp(environment.firebaseConfig); // Inicializar Firebase
    // Crear una referencia a la colección 'tasks' en Firebase 11
    const db = firebase.firestore();
    const tasksRef = db.collection('tasks');
    const dateTask = new Date();

    // Crear un nuevo documento con los datos del formulario
    tasksRef
      .add({
        title: this.titulo,
        description: this.descripcion,
        date: new Date(),
        color: this.selectedColor,
        id:
          dateTask.getFullYear().toString() +
          (dateTask.getMonth() + 1).toString().padStart(2, '0') +
          dateTask.getDate().toString().padStart(2, '0') +
          dateTask.getHours().toString().padStart(2, '0') +
          dateTask.getMinutes().toString().padStart(2, '0') +
          dateTask.getSeconds().toString().padStart(2, '0'),
      })
      .then(() => {
        console.log('Tarea guardada en Firebase 11');
        // Limpiar los campos del formulario después de guardar los datos
        this.titulo = '';
        this.descripcion = '';
        this.navCtrl.navigateBack('/tasks-list');
      })
      .catch((error) => {
        console.error('Error al guardar la tarea en Firebase 11: ', error);
      });
  }

  async openColorPicker() {
    const modal = await this.modalCtrl.create({
      component: ColorPickerPage,
      componentProps: { selectedColor: this.selectedColor },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.selectedColor = result.data;
      }
    });
    return await modal.present();
  }
}
