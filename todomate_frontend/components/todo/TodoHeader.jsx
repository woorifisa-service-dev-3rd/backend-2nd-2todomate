// index.html같은 곳에 작성했던 방식처럼 동일하게
'use client'
import { createPortal } from "react-dom";
import TodoFilter from "./TodoFilter";
import Modal from "@/components/ui/Modal";
import TodoForm from "./TodoForm";
import { useState } from "react";


// 함수형 컴포넌트(TodoHeader)
const TodoHeader = ({ onAdd, category, onFilter }) => {
  const [openModal, open] = useState(false);
  const closeModal = () => open(false);

  return (
    <div className="flex items-center justify-between mb-2" id="task-control">
      <button
        className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
        data-cy="add-todo-button"
        onClick={() => open(true)}
      >
        Add Todo
      </button>
      {/* Modal 호출 부분 */}
      {openModal && createPortal(
        <Modal onClose={closeModal}>
          <TodoForm onAdd={onAdd} onClose={closeModal}>
            New Todo
          </TodoForm>
        </Modal>, document.body)}
      <TodoFilter category={category} onFilter={onFilter}/>
    </div>
  );
};

export default TodoHeader;