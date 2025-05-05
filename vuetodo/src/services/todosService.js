const API_URL = 'http://localhost:3000/todos';

export const todosService = {
  async getAllTodos() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.filter(t => !t.done);
    } catch (error) {
      console.error('Fel vid hämtning av aktiva todos:', error);
      return [];
    }
  },

  async completeTodo(id) {
    try {
      const getResponse = await fetch(`${API_URL}/${id}`);
      if (!getResponse.ok) {
        throw new Error(`HTTP error! status: ${getResponse.status}`);
      }
      const existingTodo = await getResponse.json();

      const putResponse = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...existingTodo, done: true }),
      });
      if (!putResponse.ok) {
        throw new Error(`HTTP error! status: ${putResponse.status}`);
      }
      return true;
    } catch (error) {
      console.error(`Fel vid markering av todo ${id} som klar:`, error);
      return false;
    }
  },

  async addTodo(text) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: text, done: false }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); 
    } catch (error) {
      console.error('Fel vid tilläggning av todo:', error);
      return null;
    }
  },

  async getRandomTodo() {
    try {
      const activeTodos = await this.getAllTodos();
      if (activeTodos.length === 0) {
        return null;
      }
      const index = Math.floor(Math.random() * activeTodos.length);
      return activeTodos[index];
    } catch (error) {
      console.error('Fel vid hämtning av slumpmässig todo:', error);
      return null;
    }
  }
};