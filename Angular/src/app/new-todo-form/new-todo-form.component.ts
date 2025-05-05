import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../todos.services';

@Component({
  selector: 'app-new-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-todo-form.component.html',
  styleUrl: './new-todo-form.component.css'
})
export class NewTodoFormComponent {
  todosService = inject(TodosService);
  newTodoInput = "";

  @Output() todoAdded = new EventEmitter<void>(); // Event för att meddela att en todo har lagts till

  formSubmit() {
    if (this.newTodoInput.trim()) {
      this.todosService.addNewTodo(this.newTodoInput.trim()).subscribe(
        (newTodo) => {
          console.log("Todo added successfully:", newTodo);
          this.newTodoInput = ""; // Rensa input-fältet
          this.todoAdded.emit(); // Skicka ut ett event
        },
        (error) => {
          console.error("Error adding todo:", error);
          // Hantera felet, visa ett felmeddelande etc.
        }
      );
    }
  }
}