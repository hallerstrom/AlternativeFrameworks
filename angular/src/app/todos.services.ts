import { computed, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Todo } from "./models/todo.model";

@Injectable({
    providedIn: "root"
})
export class TodosService {
    todos = signal<Todo[]>([]);
    filteredTodos = computed(() => this.todos().filter(t => !t.done));
    private apiUrl = 'http://localhost:3000/todos';

    constructor(private http: HttpClient) {
        this.loadInitialTodos();
    }

    loadInitialTodos(): void {
        this.http.get<Todo[]>(this.apiUrl).subscribe(data => this.todos.set(data));
    }

    getAllTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    addNewTodo(todo: string): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, { todo: todo, done: false }).pipe(
            tap(newTodo => this.todos.update(currentTodos => [...currentTodos, newTodo]))
        );
    }

    completeTodo(id: number): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, { done: true }).pipe(
            tap(() => this.todos.update(currentTodos =>
                currentTodos.map(todo => (todo.id === id ? { ...todo, done: true } : todo))
            )),
            tap(() => {
                this.todos.update(currentTodos => currentTodos.filter(todo => todo.id !== id));
            })
        );
    }
}