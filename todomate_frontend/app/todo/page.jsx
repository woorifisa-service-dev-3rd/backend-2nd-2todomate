"use client";
import { useState, useEffect } from "react";
import TodoBody from "@/components/todo/TodoBody";
import Header from "@/components/common/Header";
import DefaultLayout from "@/components/common/DefaultLayout";
import { getTodos, updateTodo, deleteTodo, addTodo } from "@/api/todoApi";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [selectedoption, setFilter] = useState("ALL");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await getTodos();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    loadTodos();
  }, []);

  // Todo 등록 기능, 파라미터로 새롭게 추가할 Todo 객체를 받음
  const addTodoHandler = async ({ title, summary, option, startDate, dueDate }) => {
    // id값을 추가해서 Todo 등록
    try {
      const newTodo = {
        id: self.crypto.randomUUID(), // Web Crypto API
        title,
        summary,
        option,
        startDate,
        dueDate,
      };
      const response = await addTodo(newTodo);
      setTodos([...todos, response]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // Todo 수정 기능, 파라미터로 업데이트할 Todo 객체를 받음
  const updateTodoHandler = async (updatedTodo) => {
    try {
      await updateTodo(updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === updateTodo.id ? updateTodo : todo);
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

  // Todo 필터링 기능
  const filterTodos = () =>
    selectedoption === "ALL"
      ? todos
      : todos.filter((todo) => todo.option === selectedoption);
  // 필터링된 Todo 리스트(배열)
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
            startPath="/todo"
          />
        </section>
      </DefaultLayout>
    </>
  );
}