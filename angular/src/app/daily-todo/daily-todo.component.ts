import { Component, OnInit, inject, signal } from '@angular/core';
import { TodosService } from '../todos.services';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';

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
    const todos = this.todosService.todos().filter(t => !t.done);

    if (todos.length > 0) {
      const randomIndex = Math.floor(Math.random() * todos.length);
      this.todo.set(todos[randomIndex]);
    } else {
      this.todo.set(null);
    }
  }

  showNewRandomTodo(): void {
    this.loadRandomActiveTodo();
  }
}
