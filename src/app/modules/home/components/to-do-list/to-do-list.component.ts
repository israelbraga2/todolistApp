import { isNgTemplate } from '@angular/compiler';
import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements DoCheck {

  public taskList: Array<TaskList>= JSON.parse(localStorage.getItem("list") || '[]');
  constructor() { }

  //qdo marcar vai para baixo
  ngDoCheck(){
    this.setLocalStorage();
    
  }


  public setEmitTaskList(event: string){
    this.taskList.push({ task: event, checked: false});

  }

  public deleteItemTask(event: number) {
    this.taskList.splice(event, 1);

  }
  public deleteAllTaskList() {
    const confirm = window.confirm("Voçê deseja realmente Deletar tudo?");

    if(confirm) {
      this.taskList = [];
    }
    this.taskList= [];

  }
  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja Deletar?");
      if(confirm){
        this.deleteItemTask(index);
      }
    }
  }
  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) =>  Number(first.checked) - Number(last.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }

}
