import { Component } from '@angular/core';
import { QuestionBase, TextQuestion, YesNoQuestion, DropdownQuestion } from './form-questions.model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-custom-form-creator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-form-creator.component.html',
  styleUrls: ['./custom-form-creator.component.css']
})
export class CustomFormCreatorComponent {
  selectedQuestions: QuestionBase[] = [];
  generatedFormHtml: string = '';
  
  addQuestion(type: string) {
      switch (type) {
          case 'text':
              this.selectedQuestions.push(new TextQuestion('Kérjük adja meg a korát'));
              break;
          case 'yesNoCovid':
              this.selectedQuestions.push(new YesNoQuestion('Elkapta a COVID vírust az elmúlt egy évben?'));
              break;
          case 'yesNoHospitalized':
              this.selectedQuestions.push(new YesNoQuestion('Az elmúlt egy évben került korházba COVID miatt?'));
              break;
          case 'dropdownIllness':
              this.selectedQuestions.push(new DropdownQuestion('Milyen ismert betegségei vannak?', ['Asztma', 'Alkoholizmus', 'Elhízás']));
              break;
      }
  }

  deleteQuestion(index: number) {
    this.selectedQuestions.splice(index, 1);
}
renderForm() {
  let formHtml = '<form action="YOUR_SUBMISSION_ENDPOINT" method="post">';

  this.selectedQuestions.forEach(question => {
      formHtml += `<label for="${question.id}">${question.label}</label>`;

      if (question.type === 'text') {
          formHtml += `<input type="text" id="${question.id}" name="${question.id}"><br>`;
      } else if (question.type === 'yesno') {
          // Cast to YesNoQuestion to access options
          const yesNoQuestion = question as YesNoQuestion;
          yesNoQuestion.options.forEach(option => {
              formHtml += `<input type="radio" id="${question.id}-${option}" name="${question.id}" value="${option}"><label for="${question.id}-${option}">${option}</label>`;
          });
          formHtml += `<br>`;
      } else if (question.type === 'dropdown') {
          // Cast to DropdownQuestion to access options
          const dropdownQuestion = question as DropdownQuestion;
          formHtml += `<select id="${question.id}" name="${question.id}">`;
          dropdownQuestion.options.forEach(option => {
              formHtml += `<option value="${option}">${option}</option>`;
          });
          formHtml += `</select><br>`;
      }
  });

  formHtml += '<input type="submit" value="Submit">';
  formHtml += '</form>';
  this.generatedFormHtml = formHtml;

}



//Drag and drop cuccok későbbre:
  isDropdownQuestion(question: QuestionBase): question is DropdownQuestion {
    return question.type === 'dropdown';
  }

  getDropdownOptions(question: QuestionBase): string[] {
    if (this.isDropdownQuestion(question)) {
      return question.options;
    }
    return [];
  }

  drop(event: CdkDragDrop<QuestionBase[]>) {
    moveItemInArray(this.selectedQuestions, event.previousIndex, event.currentIndex);
  }


}