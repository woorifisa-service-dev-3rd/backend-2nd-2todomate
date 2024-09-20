
"use client";
import React, { useRef, useState } from "react";
import TodoItemV2 from "./TodoItemV2";

const TodoBody = ({ todos, setTodos, onUpdate, onDelete, startPath }) => {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [dragging, setDragging] = useState(null);

  // 드래그 앤 드롭 작업이 완료된 후 목록을 재정렬
  const handleSort = () => {
    let _todos = [...todos];

    const draggedItemContent = _todos.splice(dragItem.current, 1)[0];
    console.log("draggedItemContent", dragOverItem);
    console.log("dragOverItem.current", dragOverItem.current);
    _todos.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(_todos);
    setDragging(false);
  };

  return (
    <ul className="px-0 my-8">
      {Array.isArray(todos) && todos.map((todo, index) => (
        <TodoItemV2
          todo={todo}
          key={todo.id}
          draggable
          onUpdate={onUpdate}
          onDelete={onDelete}
          onDragStart={() => {
            // 드래그가 시작될 때 호출
            dragItem.current = index;
            setDragging(true);
          }}
          onDragEnter={() => (dragOverItem.current = index)} // 드래그 중인 항목이 다른 항목 위로 들어올 때
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()} // 드래그 중인 항목이 다른 항목 위를 지나갈 때
          dragging={dragItem.current === index}
          startPath={startPath}
        />
      ))}
    </ul>
  );
};

export default TodoBody;
