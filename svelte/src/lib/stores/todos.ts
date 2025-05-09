import { writable, derived } from 'svelte/store';

// Definiera ett gränssnitt för hur ett Todo-objekt ser ut
export interface Todo {
  id: number;
  todo: string;
  done: boolean;
}

const apiUrl = 'http://localhost:3000/todos';   


export const todos = writable<Todo[]>([]);

// Funktion för att hämta todos från servern vid start
async function fetchTodos(): Promise<void> {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Todo[] = await response.json();
    todos.set(data); // Uppdatera storen med hämtad data
  } catch (error) {
    console.error("Kunde inte hämta todos:", error);
    todos.set([]); // Hantera fel
  }
}

fetchTodos();

// Funktion för att hämta en todo med ett specifikt id
export const activeTodos = derived(todos, ($todos) =>
  $todos.filter((t) => !t.done)
);

export const randomTodo = derived(todos, ($todos) => {
  const pool = $todos.filter((t) => !t.done);
  return pool[Math.floor(Math.random() * pool.length)];
});

// Funktion för att lägga till en ny todo
export async function addTodo(todo: string): Promise<void> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo: todo, done: false }), 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newTodo: Todo = await response.json();
    todos.update((items) => [...items, newTodo]); // Lägg till den nya todon i storen
  } catch (error) {
    // Felhantering
    console.error("Kunde inte lägga till todo:", error);
  }
}
 // Funktion för att ta bort en todo
export async function completeTodo(id: number): Promise<void> {
  try {
    // Hämta todo 
    const getResponse = await fetch(`${apiUrl}/${id}`);
    if (!getResponse.ok) {
      throw new Error(`HTTP error! status: ${getResponse.status}`);
    }
    const existingTodo: Todo = await getResponse.json();

    // Markera todo som klar
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...existingTodo, done: true }), // Uppdatera done
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    todos.update((items) =>
      items.map((t) => (t.id === id ? { ...t, done: true } : t))
    );
  } catch (error) {
    // Felhantering
    console.error(`Kunde inte markera todo med id ${id} som klar:`, error);
  }
}