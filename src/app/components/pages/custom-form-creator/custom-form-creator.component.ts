import { Component } from '@angular/core';
import { QuestionBase, TextQuestion, YesNoQuestion, DropdownQuestion } from './form-questions.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-custom-form-creator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-form-creator.component.html',
  styleUrls: ['./custom-form-creator.component.css']
})
export class CustomFormCreatorComponent {
  selectedQuestions: QuestionBase[] = [];
  addQuestion(type: string) {
      switch (type) {
          case 'text':
              this.selectedQuestions.push(new TextQuestion('What is your age?'));
              break;
          case 'yesNoCovid':
              this.selectedQuestions.push(new YesNoQuestion('Have you been affected by the Covid virus in the past year?'));
              break;
          case 'yesNoHospitalized':
              this.selectedQuestions.push(new YesNoQuestion('Have you been hospitalized by Covid in the past year?'));
              break;
          case 'dropdownIllness':
              this.selectedQuestions.push(new DropdownQuestion('What type of illnesses do you have', ['Illness 1', 'Illness 2', 'Illness 3']));
              break;
      }
  }
  isDropdownQuestion(question: QuestionBase): question is DropdownQuestion {
    return question.type === 'dropdown';
  }

  getDropdownOptions(question: QuestionBase): string[] {
    if (this.isDropdownQuestion(question)) {
        return question.options;
    }
    return [];
  }


}
