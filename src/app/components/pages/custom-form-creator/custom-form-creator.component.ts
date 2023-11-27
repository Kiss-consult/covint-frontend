import { Component } from '@angular/core';
import { QuestionBase, TextQuestion, YesNoQuestion, MultiSelectQuestion, yesnohospitalQuestion } from './form-questions.model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-custom-form-creator',
  standalone: true,
  imports: [CommonModule, FormsModule,ColorPickerModule ],
  templateUrl: './custom-form-creator.component.html',
  styleUrls: ['./custom-form-creator.component.css']
})
export class CustomFormCreatorComponent {
  backgroundColor: string = '#ffffff'; // Default white
  textColor: string = '#000000'; // Default black
  selectedQuestions: QuestionBase[] = [];
  generatedFormHtml: string = '';

  availableQuestions: { label: string, type: string, selected: boolean }[] = [
  { label: 'Kor kérdés', type: 'text', selected: false },
  { label: 'Covid kérdés', type: 'yesno', selected: false },
  { label: 'Korház Kérdés', type: 'yesnohospital', selected: false },
  { label: 'Betegség kérdés', type: 'multiselect', selected: false }
];


  toggleQuestionSelection(question: { label: string, type: string, selected: boolean }) {
    if (question.selected) {
      if (!this.selectedQuestions.some(q => q.type === question.type)) {
        this.addQuestion(question.type);
      }
    } else {
      this.deleteQuestion(question.type);
    }
  }
  


  
  addQuestion(type: string) {
      switch (type) {
          case 'text':
              this.selectedQuestions.push(new TextQuestion('Kérjük adja meg a korát'));
              break;
          case 'yesno':
              this.selectedQuestions.push(new YesNoQuestion('Elkapta a COVID vírust az elmúlt egy évben?'));
              break;
          case 'yesnohospital':
              this.selectedQuestions.push(new yesnohospitalQuestion('Az elmúlt egy évben került korházba COVID miatt?'));
              break;
          case 'multiselect':
              const newMultiSelectQuestion = new MultiSelectQuestion('Az alábbi lehetőségek közül kérjük válassza ki milyen betegségekkel rendelkezik', ['Elhízás', 'Asztma','Szívbetegség'], true);
              this.selectedQuestions.push(newMultiSelectQuestion);
              break;

      }
  }

  deleteQuestion(type: string) {
    const index = this.selectedQuestions.findIndex(q => q.type === type);
    if (index > -1) {
      this.selectedQuestions.splice(index, 1);
    }
  }
  
renderForm() {
  let formHtml = '<form action="" method="post">';

  this.selectedQuestions.forEach(question => {
      formHtml += `<label for="${question.id}">${question.label}</label>`;

      if (question.type === 'text') {
          formHtml += `<input type="text" id="${question.id}" name="${question.id}"><br>`;
      } else if (question.type === 'yesno') {
          const yesNoQuestion = question as YesNoQuestion;
          yesNoQuestion.options.forEach(option => {
              formHtml += `<input type="radio" id="${question.id}-${option}" name="${question.id}" value="${option}"><label for="${question.id}-${option}">${option}</label>`;
          });
          formHtml += `<br>`;
      } else if (question.type === 'multiselect') {
        this.generatedFormHtml += `<label>${question.label}</label>`;
        this.generatedFormHtml += `<select name="${question.id}" multiple>`;
        const MultiSelectQuestion = question as MultiSelectQuestion;
        MultiSelectQuestion.options.forEach(option => {
            this.generatedFormHtml += `<option value="${option}">${option}</option>`;
        });

        this.generatedFormHtml += `</select>`;
    }

  });

  formHtml += '<input type="submit" value="Submit">';
  formHtml += '</form>';
  this.generatedFormHtml = formHtml;

}



//Drag and drop cuccok későbbre:
isMultiSelectQuestion(question: QuestionBase): question is MultiSelectQuestion {
  return question.type === 'multiselect';
}

getOptions(question: QuestionBase): string[] {
  if (this.isMultiSelectQuestion(question)) {
      return question.options;
  }
  return [];
}

getSelectedOptions(question: QuestionBase): string[] {
  if (this.isMultiSelectQuestion(question)) {
      return question.selectedOptions;
  }
  return [];
}
toggleSelection(question: MultiSelectQuestion, option: string) {
  if (!question.selectedOptions) {
      question.selectedOptions = [];
  }
  const index = question.selectedOptions.indexOf(option);
  if (index > -1) {
      question.selectedOptions.splice(index, 1);
  } else {
      question.selectedOptions.push(option);
  }
}

removeSelection(question: MultiSelectQuestion, option: string) {
  const index = question.selectedOptions.indexOf(option);
  if (index > -1) {
      question.selectedOptions.splice(index, 1);
  }
}

drop(event: CdkDragDrop<QuestionBase[]>) {
  moveItemInArray(this.selectedQuestions, event.previousIndex, event.currentIndex);
}



} 