"use client";
import { useState,useEffect } from "react";
import TodoBody from "@/components/todo/TodoBody";
import Header from "@/components/common/Header";
import DefaultLayout from "@/components/common/DefaultLayout";
import { getTodos, addTodo, updateTodo, deleteTodo } from "@/api/todoApi";



export default function todo() {
  const [todos, setTodos] = useState([]);
  const [selectedoption, setFilter] = useState("ALL");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data); 
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    loadTodos();
  }, []); 

  // Todo 추가 기능
  const addTodoHandler = async ({ title, summary, option, startDate, dueDate }) => {
    try {
      const newTodo = await addTodo({ title, summary, option, startDate, dueDate });
      setTodos([...todos, newTodo]);
      console.log(todos);
      
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // Todo 수정 기능
  const updateTodoHandler = async (updateTodo) => {
    try {
      const updatedTodo = await updateTodo(updateTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  // Todo 삭제 기능
  const deleteTodoHandler = async (id) => {
    try {
      await deleteTodo({ id });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // Todo 필터링
  const filterTodos = () =>
    selectedoption === "ALL"
      ? todos
      : todos.filter((todo) => todo.option === selectedoption);
  const filteredTodos = filterTodos();

  return (
    <>
      <DefaultLayout>
        <header>
          <div className="flex justify-center">
            <a to="/" className="flex">
              <h1 className="py-8 text-red-200 max-w-max text-7xl">Todos</h1>
            </a>
          </div>
        </header>
        <section className="max-w-xl m-4 mx-auto">
          <Header
            onAdd={addTodoHandler}
            option={selectedoption}
            onFilter={setFilter}
          />
          <TodoBody
            todos={filteredTodos}
            setTodos={setTodos}
            onUpdate={updateTodoHandler}
            onDelete={deleteTodoHandler}
          />
        </section>
      </DefaultLayout>
    </>
  );
}
