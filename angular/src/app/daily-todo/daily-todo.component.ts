import { Component, OnInit, inject, signal } from '@angular/core';
import { TodosService } from '../todos.services';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs'; 

// Komponent för att visa en slumpmässig aktiv todo-post
@Component({
  selector: 'app-daily-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-todo.component.html',
  styleUrl: './daily-todo.component.css'
})
export class DailyTodoComponent implements OnInit {
  todo = signal<Todo | null>(null);
  todosService = inject(TodosService);

  ngOnInit(): void {
    this.loadRandomActiveTodo();
  }

  async loadRandomActiveTodo(): Promise<void> {
    try {
      // Hämta alla todo-poster och filtrera bort de som är klara
      const todos = await firstValueFrom(
        this.todosService.getAllTodos().pipe(
          map(todos => todos.filter(todo => !todo.done))
        )
      );

      if (todos.length > 0) {
        const randomIndex = Math.floor(Math.random() * todos.length);
        this.todo.set(todos[randomIndex]);
      } else {
        this.todo.set(null);
      }
    } catch (error) {
      console.error('Fel vid hämtning av todo:', error);
      this.todo.set(null);
    }
  }

  showNewRandomTodo(): void {
    this.loadRandomActiveTodo();
  }
}
