import { Component } from '@angular/core';

@Component({
  selector: 'app-datainput',
  templateUrl: './datainput.component.html',
  styleUrls: ['./datainput.component.css']
})


export class DatainputComponent {
  name = 'Angular';

  newCourse: string = '';
  allCourses: string[] = [];

  // Function to add course
  addCourse() {
    this.allCourses.push(this.newCourse);
    //Reset input
    this.newCourse = '';
  }
}