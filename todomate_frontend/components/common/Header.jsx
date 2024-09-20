// index.html같은 곳에 작성했던 방식처럼 동일하게
"use client";
import { createPortal } from "react-dom";
import TodoFilter from "../todo/TodoFilter";
import Modal from "@/components/ui/Modal";
import TodoForm from "./AddForm";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// 함수형 컴포넌트(Header)
const Header = ({ onAdd, option, onFilter }) => {
  const [openModal, open] = useState(false);

  const closeModal = () => open(false);
  const pathname = usePathname();
  const router = useRouter();


  const handleToggle = () => {
    if (pathname.startsWith("/todo")) {
      router.push("/diary");
    } else {
      router.push("/todo");
    }
  };

  return (
    <div className="flex items-center justify-between mb-2" id="task-control">
      <div className="flex items-center justify-between space-x-4">
        <button
          className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
          data-cy="add-todo-button"
          onClick={() => open(true)}
        >
          {pathname.startsWith("/todo") ? "Add todo" : "Add Diary"}
        </button>
        <div
          className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
          onClick={handleToggle}
        >
          {pathname.startsWith("/todo") ? "Diary" : "Todo"}
        </div>
      </div>
      {/* Modal 호출 부분 */}
      {openModal &&
        createPortal(
          <Modal onClose={closeModal}>
            <TodoForm onAdd={onAdd} onClose={closeModal}>
              {pathname.startsWith("/todo") ? "New Todo" : "New Diary"}
            </TodoForm>
          </Modal>,
          document.body
        )}
        {pathname.startsWith("/todo") ? <TodoFilter option={option} onFilter={onFilter} /> : <></>}
      
    </div>
  );
};

export default Header;
