import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './models/todo.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private apiUrl = 'http://localhost:3000/todos';
  todos = signal<Todo[]>([]); // Alla todos
  filteredTodos = computed(() => this.todos().filter(t => !t.done)); // Endast de som inte är klara

  constructor(private http: HttpClient) {
    this.loadTodos(); // Laddas direkt
  }

  loadTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe({
      next: (data) => this.todos.set(data),
      error: (err) => console.error('Kunde inte hämta todos:', err),
    });
  }

  completeTodo(id: number): void {
    this.http.patch<Todo>(`${this.apiUrl}/${id}`, { done: true }).subscribe({
      next: () => this.loadTodos(), // Ladda om listan efter uppdatering
      error: (err) => console.error('Kunde inte uppdatera todo:', err),
    });
  }

  addNewTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { todo: title, done: false }).pipe(
      tap(() => this.loadTodos()) // Ladda om listan när en ny todo har lagts till
    );
  }
}
