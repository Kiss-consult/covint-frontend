import { Component } from '@angular/core';

@Component({
  selector: 'app-diagram-test',
  templateUrl: './diagram-test.component.html',
  styleUrls: ['./diagram-test.component.css']
})
export class DiagramTestComponent {
  activeTab: number = 1;

  showTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
