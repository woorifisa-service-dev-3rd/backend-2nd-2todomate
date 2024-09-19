import { instance } from './instance';

// 모든 Todo 조회 (get, /api/todos/list)
export const getTodos = async () => {
    const response = await instance('todos/list', {
        method: 'GET',
    });
    
    return response;
}

// Todo 추가 (post, /api/todos/add)
export const addTodo = async ({ title, summary, option, startDate, dueDate }) => {
    const response = await instance('todos/add', {
        body: JSON.stringify({ title, summary, option, startDate, dueDate }),
        method: 'POST',
    });
    return response;
}

// Todo 수정 (put, /api/todos/update/{id})
export const updateTodo = async ({ id, title, summary, option, startDate, dueDate }) => {
    const response = await instance('todos/update/${id}', {
        body: JSON.stringify({ title, summary, option, startDate, dueDate }),
        method: 'POST',
    });
    return response;
}

// 다이어리 삭제 (post, /api/todos/delete/{id})
export const deleteTodo = async ({ id }) => {
    const response = await instance('todos/delete/${id}', {
        method: 'POST',
    });
    return response;
}