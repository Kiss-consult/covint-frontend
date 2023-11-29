import { Component } from '@angular/core';
import { QuestionBase, TextQuestion, YesNoQuestion, MultiSelectQuestion, yesnohospitalQuestion } from './form-questions.model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-custom-form-creator',
  standalone: true,
  imports: [CommonModule, FormsModule,ColorPickerModule],
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
  

  drop(event: CdkDragDrop<QuestionBase[]>) {
    moveItemInArray(this.selectedQuestions, event.previousIndex, event.currentIndex);
}
  
  addQuestion(type: string) {
      switch (type) {
          case 'text':
              this.selectedQuestions.push(new TextQuestion('Kérjük adja meg a korát:'));
              break;
          case 'yesno':
              this.selectedQuestions.push(new YesNoQuestion('Elkapta a COVID vírust az elmúlt egy évben?'));
              break;
          case 'yesnohospital':
              this.selectedQuestions.push(new yesnohospitalQuestion('Az elmúlt egy évben került korházba COVID miatt?'));
              break;
          case 'multiselect':
              const newMultiSelectQuestion = new MultiSelectQuestion('Az alábbi lehetőségek közül kérjük válassza ki milyen betegségekkel rendelkezik:', ['Elhízás', 'Asztma','Szívbetegség'], true);
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
  let formHtml = '<form style="background-color: id="generatedForm"' + this.backgroundColor + '; color: ' + this.textColor + ';">';

  this.selectedQuestions.forEach(question => {
      if (question.type === 'text') {
          formHtml += '<label style="color: ' + this.textColor + ';">' + question.label + '</label>';
          formHtml += '<input type="text" style="background-color: ' + this.backgroundColor + '; color: ' + this.textColor + ';" name="' + question.id + '">';
      } else if (question.type === 'yesno' || question.type === 'yesnohospital') {
          formHtml += '<label style="color: ' + this.textColor + ';">' + question.label + '</label>';
          formHtml += '<input type="radio" name="' + question.id + '" value="Yes"> Yes ';
          formHtml += '<input type="radio" name="' + question.id + '" value="No"> No';
      } else if (question.type === 'multiselect') {
          formHtml += '<label style="color: ' + this.textColor + ';">' + question.label + '</label>';
          const MultiSelectQuestion = question as MultiSelectQuestion;
          MultiSelectQuestion.options.forEach(option => {
              formHtml += '<input type="checkbox" name="' + question.id + '" value="' + option + '"> ' + option;
          });
      }
  });


  formHtml += '<input type="submit" value="Submit">';
  formHtml += '</form>';
  formHtml += `
        <script>
        function submitForm() {
            var formElement = document.getElementById('generatedForm'); 
            var formData = new FormData(formElement);
            var formValues = {};

            formData.forEach(function(value, key) {
                formValues[key] = value;
            });

            
            fetch('ENDPOINT_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })
            .then(function(response) { return response.json(); })
            .then(function(data) { console.log('Success:', data); })
            .catch(function(error) { console.error('Error:', error); });
        }
        </script>
    `;

    this.generatedFormHtml += '<button type="button" onclick="submitForm()">Submit</button>';
    this.generatedFormHtml = formHtml;

}
sendFormData(data: any) {
  fetch('YOUR_ENDPOINT_URL', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}
submitForm() {
  const formElement = document.createElement('form');
  formElement.innerHTML = this.generatedFormHtml;
  const formData = new FormData(formElement);
  const formValues = {};

  formData.forEach((value, key) => {
 //     formValues[key] = value;
  });

  this.sendFormData(formValues);
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




} 