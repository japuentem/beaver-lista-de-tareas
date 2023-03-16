import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.page.html',
  styleUrls: ['./color-picker.page.scss'],
})
export class ColorPickerPage implements OnInit {
  colors: string[] = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    // '#673ab7',
    // '#3f51b5',
    '#2196f3',
    '#00bcd4',
    // '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    // '#795548',
    // '#607d8b',
  ];

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {}

  selectColor(color: string) {
    this.modalCtrl.dismiss(color);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
