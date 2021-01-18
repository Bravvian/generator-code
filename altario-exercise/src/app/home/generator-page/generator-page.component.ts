import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild,} from '@angular/core';


@Component({
  selector: 'app-generator-page',
  templateUrl: './generator-page.component.html',
  styleUrls: ['./generator-page.component.scss']
})
export class GeneratorPageComponent implements OnInit {

  gridData = [];

  userInput: string;

  inputs = [];

  code: string;

  disableInput = false;

 @Output() newEvent = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }

  addInput(){
    this.disableInput = true;

    // Unlock form after 4 secs
    setTimeout(()=>{
      this.disableInput=false;
    }, 4000);

    this.inputs.push(this.userInput);


    if(this.gridData.length !=0) {
      this.generateGrid();
    }
  }

  generateGrid(){
    if(this.inputs.length != 0){
      this.gridData = Array.from({length: 20}, () => this.getRandom(this.inputs)).concat(this.getArrayOfRandoms(80))
    }else{
      this.gridData = this.getArrayOfRandoms();
    }

    setInterval(()=>{
      this.generateCode();
    }, 2000);

  }

  getArrayOfRandoms(size: number = 100){
    return Array.from({length: size}, () => this.randomCharacter());
  }

  randomCharacter(){
    return String.fromCharCode(65+Math.floor(Math.random() * 26));
  }

  getRandom(input = []){
    return input[Math.floor(Math.random() * input.length)];
  }

  generateCode(){
    const [position1, position2] = this.getPositions();

    const count1 = this.countCharacter(this.findCharacters(position1[0], position1[1]));
    const count2 = this.countCharacter(this.findCharacters(position2[0], position2[1]));

    this.code = `${count1}${count2}`
    this.newEvent.emit(this.code);
  }

  findCharacters(row, column){
    let element = this.gridData.slice(row*10, row*10 + 10);
    return element[column];
  }

  getPositions(){
    const number = ('0' + new Date().getSeconds()).slice(-2);
    let position1 = Array.from(number, Number);

    const position2 = [position1[1], position1[0]];

    return [position1, position2];
  }

  countCharacter(character: string){
    let count = 0
    this.gridData.forEach((element)=>{
      if (element.toLowerCase() === character.toLowerCase()){
        count += 1
      }
    });
    return count > 9 ? Math.ceil(count/2) : count
  }
}
