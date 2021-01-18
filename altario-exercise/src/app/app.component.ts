import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  code: string;
  grid: number = 2;
  title = 'altario-exercise';

  getCode(event){
    console.log(event);
    this.code = event;
  }
}
