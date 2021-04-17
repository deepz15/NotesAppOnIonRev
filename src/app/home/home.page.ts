import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notesTitleNg = '';
  notesContentNg = '';
  notesImageNg: any;
  notesSavingArray = [];
  reader = new FileReader();
  imgNg: any;
  saveButton = false;
  constructor() {
    setInterval(() => {
    this.disableButton();
  }, 500);
  }

  saveNotesData = () => {
    const dataFromNgModels = {
      title: this.notesTitleNg,
      content: this.notesContentNg,
      image: this.reader.result
    };
    if (!localStorage.getItem('notesData')) {
      if (!dataFromNgModels) {
        this.notesSavingArray.unshift(dataFromNgModels);
        localStorage.setItem('notesData', JSON.stringify(this.notesSavingArray));

      }
    } else {
      const existingData = JSON.parse(localStorage.getItem('notesData'));
      existingData.unshift(dataFromNgModels);
      localStorage.setItem('notesData', JSON.stringify(existingData));
    }
    console.log(this.notesSavingArray);
    this.notesTitleNg = '';
    this.notesContentNg = '';
  }
  disableButton() {
    if (this.notesTitleNg === '' || this.notesContentNg === '') {
      this.saveButton = false;
    }
    else {
      this.saveButton = true;
    }
  }
}
