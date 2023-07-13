export const ADD_TODO = "ADD_TODO";

let todoId = 0;

export const addTodo = task => ({
  type: ADD_TODO,
  payload: {
    id: ++todoId,
    task
  }
});