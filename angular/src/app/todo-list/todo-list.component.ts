import { Component, inject } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodosService } from '../todos.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})

// Komponent för att visa en lista med todo-poster
export class TodoListComponent {
  todosService = inject(TodosService);
  todos = this.todosService.filteredTodos; 

  itemDone(id: number): void {
    this.todosService.completeTodo(id); // Markera todo som klar
  }
}