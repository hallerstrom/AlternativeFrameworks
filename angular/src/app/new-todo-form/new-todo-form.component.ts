import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../todos.services';

// Komponent för att lägga till nya todo-poster
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
  
  @Output() todoAdded = new EventEmitter<void>(); 

  // Metod för att skicka in en ny todo-post
  formSubmit() {
    if (this.newTodoInput.trim()) {
      this.todosService.addNewTodo(this.newTodoInput.trim()).subscribe(
        (newTodo) => {
          this.newTodoInput = ""; 
          this.todoAdded.emit(); 
        },

        // Hantera eventuella fel vid tillägg av todo-poster
        (error) => {
          console.error("Error adding todo:", error);
        }
      );
    }
  }
}