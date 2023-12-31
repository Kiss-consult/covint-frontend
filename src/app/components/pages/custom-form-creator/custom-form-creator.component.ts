import { Component } from '@angular/core';
import { QuestionBase, TextQuestion, YesNoQuestion, MultiSelectQuestion, yesnohospitalQuestion, SexQuestion, RelativeQuestion  } from './form-questions.model';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { BackendService } from 'src/app/services/backend/backend.service'; 
import { Ok } from 'src/app/models/utils/result';


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
  questionBackgroundColor: string = '#ffffff';
  selectedQuestions: QuestionBase[] = [];
  generatedFormHtml: string = '';
  formName: string = 'Kérdőív';
  displayResponse: string = '';
  showFollowUpQuestion: boolean = false;

  availableQuestions: { label: string, type: string, selected: boolean }[] = [
  { label: 'Kor kérdés', type: 'text', selected: false },
  { label: 'Covid kérdés', type: 'yesno', selected: false },
  { label: 'Korház Kérdés', type: 'yesnohospital', selected: false },
  { label: 'Betegség kérdés', type: 'multiselect', selected: false },
  { label: 'Nem kérdés', type: 'sex', selected: false },
  { label: 'Hozzátartozóként tölti ki a kérdőívet?', type: 'relative', selected: false }

];
  location: any;


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
          case 'sex':
            this.selectedQuestions.push(new SexQuestion('Kérjük válassza ki a nemét:'));
            break;
          case 'relative':
            this.selectedQuestions.push(new RelativeQuestion('Hozzátartozóként tölti ki a kérdőívet?'));
            break;
          
              

      }
      
  }
  onRelativeAnswerChange(answer: string) {
    this.showFollowUpQuestion = answer === 'Yes';
  }

  deleteQuestion(type: string) {
    const index = this.selectedQuestions.findIndex(q => q.type === type);
    if (index > -1) {
      this.selectedQuestions.splice(index, 1);
    }
  }
  generateUniqueFormName(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const day = now.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 999
    const sanitizedFormName = this.formName.replace(/[^a-zA-Z0-9-_]/g, '');
    return `${sanitizedFormName}-${formattedDate}-${randomNum}`;
}


renderForm() {
  const uniqueFormName = this.generateUniqueFormName();
  let formHtml = `
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${this.formName}</title>
    </head>
    <body style="background-color: whitesmoke;">
      <div style="display: flex; justify-content: center; align-items: center; height: 100%; padding: 20px;">
        <form style="background-color: ${this.backgroundColor}; color: ${this.textColor}; padding: 20px; border: 1px solid #0800ff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); width: 50%;" id="${uniqueFormName}">
          <h4 style="font-size:45px; font-family: 'Arial'; text-align: center;">${this.formName}</h4>`;
          let questionContainerStyle = `display: flex; flex-direction: column; align-items: flex-start; margin: 10px; padding: 5px; border: 1px solid #0800ff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); background-color: ${this.questionBackgroundColor};`;
          let labelStyle = `font-weight: bold; font-family: 'Arial', sans-serif; font-size: 16px; color: ${this.textColor};`; // Removed margin-bottom
          let inputStyle = `background-color: ${this.backgroundColor}; color: ${this.textColor}; width: 100%;`; // Set width to 100% for full width

  this.selectedQuestions.forEach(question => {
      

      formHtml += `<div style="${questionContainerStyle}">`;

      if (question.type === 'text') {
          formHtml += `<label style="${labelStyle}">${question.label}</label>`;
          formHtml += `<input type="text" style="${inputStyle}" name="Age">`;
      } else if (question.type === 'yesnohospital') {
          formHtml += `<label style="${labelStyle}">${question.label}</label>`;
          formHtml += `<input type="radio" name="Hospitalized" value="Yes" style="${inputStyle}"> Igen `;
          formHtml += `<input type="radio" name="Hospitalized" value="No" style="${inputStyle}"> Nem`;
      }
        else if (question.type === "yesno" ) {
          formHtml += `<label style="${labelStyle}">${question.label}</label>`;
          formHtml += `<input type="radio" name="Covid" value="Yes" style="${inputStyle}"> Igen `;
          formHtml += `<input type="radio" name="Covid" value="No" style="${inputStyle}"> Nem`;
      }
        else if (question.type === "sex"){
          formHtml += `<label style="${labelStyle}">${question.label}</label>`;
          formHtml += `<input type="radio" name="Sex" value="Férfi" style="${inputStyle}"> Férfi `;
          formHtml += `<input type="radio" name="Sex" value="Nő" style="${inputStyle}"> Nő`;
        }
        else if (question.type === 'relative'){
          formHtml += `<label style="${labelStyle}">${question.label}</label>`
          formHtml += `<input type="radio" name="${question.id}" value="Yes" style="${inputStyle}" onchange="toggleFollowUpQuestion(this.value)"> Igen`
          formHtml += `<input type="radio" name="${question.id}" value="No" style="${inputStyle}" onchange="toggleFollowUpQuestion(this.value)"> Nem`
        }
        else if (question.type === 'multiselect') {
          formHtml += `<label style="${labelStyle}">${question.label}</label>`;
          const MultiSelectQuestion = question as MultiSelectQuestion;
          MultiSelectQuestion.options.forEach(option => {
              formHtml += `<input type="checkbox" name="Illnesses" value="${option}" style="${inputStyle}"> ${option}`;
          });
      }
      formHtml += `</div>`; // Close the question container
  });
  formHtml += `<div id="followUpQuestion" style="display:none; flex; flex-direction: column; align-items: flex-start; margin: 10px; padding: 5px; border: 1px solid #0800ff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); background-color: ${this.questionBackgroundColor};">`
  formHtml += `<label style="${labelStyle}">A hozzátartozója elhunyt Covidban?</label>`
  formHtml += `<input type="radio" name="relativeDiedOfCovid" value="Yes" style="${inputStyle}"> Igen`
  formHtml += `<input type="radio" name="relativeDiedOfCovid" value="No" style="${inputStyle}"> Nem`
  formHtml += `</div>`

  let buttonStyle = `width: 200px; height: 40px; background-color: #0080ff; border-color: #0080ff; border-radius: 5px; color: white; text-align: center; text-decoration: none; display: inline-block; font-size: 1rem; cursor: pointer;`;

  // Wrap the button in a div for center alignment
  formHtml += `<div style="text-align: center; margin-top: 20px;"><input type="submit" onclick="submitForm()" value="Küldés" style="${buttonStyle}"></div></form></div>`;


  // Script for form submission
  formHtml += `
  <script>
  function toggleFollowUpQuestion(value) {
    var followUpQuestion = document.getElementById('followUpQuestion');
    followUpQuestion.style.display = value === 'Yes' ? 'block' : 'none';
  }
  document.addEventListener('DOMContentLoaded', function() {
    var relativeRadioButtons = document.getElementsByName('relative');
    for (var i = 0; i < relativeRadioButtons.length; i++) {
      if (relativeRadioButtons[i].checked) {
        toggleFollowUpQuestion(relativeRadioButtons[i]);
      }
    }
  });

  function submitForm() {
    var formElement = document.getElementById('${uniqueFormName}');
    var formData = new FormData(formElement);
    var formValues = {
        "Sex": formData.get("Sex"),
        "Age": parseInt(formData.get("Age")),
        "Hospitalized": formData.get("Hospitalized") === "Yes",
        "Dead": formData.get("Dead") === "Yes",
        "Illnesses": [],
        "Source": "form",
        "Date": new Date().toISOString().split('T')[0]
    };

    // Handle multi-select (Illnesses)
    formData.getAll("Illnesses").forEach(function(value) {
        formValues.Illnesses.push(value);
    });

    fetch('http://localhost:8090/cases/nonvalidated/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
    })
    .then(function(response) { 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(function(data) {
        console.log('Success:', data);  
        alert('Köszönjük, válaszát rögzítettük'); // Show alert on success
    })
    .catch(function(error) {
        console.error('Error:', error);
    });
    alert('Köszönjük, válaszát rögzítettük'); 
  }
  </script>
</body>
</html>`;

  this.generatedFormHtml = formHtml;
}


constructor(private backendService: BackendService) { }

sendFormToBackend() {
  const uniqueFormName = this.generateUniqueFormName(); // Generate the unique form name
  this.backendService.sendFormHtml(this.generatedFormHtml, uniqueFormName).subscribe({
    next: (result: any) => {
      // Directly access the 'value' property of the result
      if (result && result.value) {
        this.displayResponse = `URL: ${result.value.Url}\n\nIframe:\n${result.value.Iframe}`;
      } else {
        // Handle the case where the result is not in the expected format
        console.error('Unexpected response format', result);
      }
    },
    error: (error) => {
      console.error('Error sending form', error);
    }
  });
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
  this.renderForm(); 

  if (!this.generatedFormHtml) {
      console.error("No HTML content to generate");
      return;
  }

  this.sendFormToBackend(); 
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