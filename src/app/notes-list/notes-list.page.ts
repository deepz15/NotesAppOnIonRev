import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.page.html',
  styleUrls: ['./notes-list.page.scss'],
})

export class NotesListPage {

  constructor(public atrCtrl: AlertController) {
    this.displayNotesFromArray();
  }
  notesListArray = [];
  message: string;
  editBx: any;
  deleteConf: boolean;
  editTitle = '';
  editContent = '';
  index: number;

  displayNotesFromArray = () => {
    const localData = localStorage.getItem('notesData');
    if (localData) {
      this.notesListArray = JSON.parse(localData);
    }
  }
  async showConfirmAlert() {
    const alertConfirm = this.atrCtrl.create({
      message: 'Are You Sure to delete this notes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.deleteConf = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteConf = true;
            this.deleteNotesFromList(this.index);
            console.log('Yes clicked');
          }
        }
      ]
    });
    (await alertConfirm).present();

  }
  indexGetter(i){
    this.index = i;
  }
  deleteNotesFromList = (i) => {
    console.log(this.deleteConf);
    this.index = i;
    this.notesListArray.splice(i, 1);
    localStorage.setItem('notesData', JSON.stringify(this.notesListArray));
    this.message = 'Notes deleted';

    setTimeout(() => {
      this.message = ' ';
    }, 1000);
  }
  updateNotes() {
    this.editBx = {
      display: 'none'
    };
    const updatedData = {
      title: this.editTitle,
      content: this.editContent
    };
    this.notesListArray.splice(this.index, 1, updatedData);
    localStorage.setItem('notesData', JSON.stringify(this.notesListArray));
  }
  editNotesOnList(i) {
    this.editBx = {
      display: 'block'
    };
    const arr = this.notesListArray[i];
    this.editTitle = arr.title;
    this.editContent = arr.content;
    this.index = i;
  }
  closeEdit(){
    this.editBx = {
      display: 'none'
    };
  }
}

