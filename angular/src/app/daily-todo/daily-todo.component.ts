import { Component, OnInit, inject, signal } from '@angular/core';
import { TodosService } from '../todos.services';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

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

  loadRandomActiveTodo(): void {
    this.todosService.getAllTodos().pipe(
      map(todos => todos.filter(todo => !todo.done)), // Filtrera aktiva todos
      map(activeTodos => {
        if (activeTodos && activeTodos.length > 0) {
          const randomIndex = Math.floor(Math.random() * activeTodos.length);
          return activeTodos[randomIndex];
        }
        return null;
      })
    ).subscribe(
      (randomActiveTodo) => {
        this.todo.set(randomActiveTodo);
      },
      (error) => {
        console.error('Fel vid hämtning av slumpmässig aktiv todo:', error);
        this.todo.set(null);
      }
    );
  }

  showNewRandomTodo(): void {
    this.loadRandomActiveTodo();
  }
}