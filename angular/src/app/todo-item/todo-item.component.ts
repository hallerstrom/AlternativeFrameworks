import { Component, input, Input, output } from '@angular/core';
import { Todo } from "../models/todo.model"

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  doneItem = output<number>()

  // funktion för att markera en todo-post som klar
  itemDone() {
    this.doneItem.emit(this.todo().id)
  }
}
