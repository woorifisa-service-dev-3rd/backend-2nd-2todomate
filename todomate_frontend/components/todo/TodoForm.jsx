"use client";
import React, { useState } from "react";
import { TODO_option_ICON } from "@/constants/icon";
import { addTodo, updateTodo } from "@/api/todoApi"
import { addDiary, updateDiary } from "@/api/diaryApi";
import { usePathname } from "next/navigation";

const TodoForm = ({ onAdd, onUpdate, onClose, children, todo }) => {
  const pathname = usePathname();
  // children -> New Todo or Update Todo
  const isNewTodoForm = (children) =>
    children.startsWith("New") ? true : false;

  // TODO: 하나의 Todo 객체로 관리할 수 있도록 state 줄여보기
  const [title, setTitle] = useState(isNewTodoForm(children) ? "" : todo.title);
  const [summary, setSummary] = useState(
    isNewTodoForm(children) ? "" : todo.summary
  );
  const [option, setoption] = useState(
    isNewTodoForm(children) ? "TODO" : todo.option
  );
  const [startDate, setStartDate] = useState(
    isNewTodoForm(children) ? "" : todo.startDate
  );
  const [dueDate, setDueDate] = useState(
    isNewTodoForm(children) ? "" : todo.dueDate
  );
  const [isInValid, setIsInValid] = useState(false);

  const addOrUpdateTodoHandler = async () => {

    // 최종 검증: 입력 값이 모두 비어있지 않은지 확인 (diary면 title과 summary만 검증)
    if (title === "" || summary === "" || (pathname.startsWith("/todo") && (startDate === "" || dueDate === ""))) {
      setIsInValid(true); // 유효성 검사 실패
      return; // 검증 실패 시 함수 종료
    }

    if (pathname.startsWith("/todo")) {
      if (isNewTodoForm(children)) {
        // Add 로직
        const newTodo = { title, summary, category, startDate, dueDate };
        onAdd(newTodo);
      } else {
        // Update 로직
        const updateTodo = {
          id: todo.id,
          title, // title: title과 같음
          summary,
          category,
          startDate,
          dueDate,
        };
        onUpdate(updateTodo);
      }
    }

    // api 사용하도록 변경
    else if (pathname.startsWith("/diary")) {
      if (isNewTodoForm(children)) {
        await addDiary({ title, content: summary });
      } else {
        await updateDiary({ id: todo.id, title, content: summary });
      }
    }
    onClose();
  };

  return (
    <>
      <h3 className="text-3xl text-red-200">{children}</h3>
      <form className="my-2">
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="title">
            Title
          </label>
          <input
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-xl text-white" htmlFor="summary">
            {pathname.startsWith("/diary") ? "Content" : "Summary"}
          </label>
          <textarea
            className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
            id="summary"
            rows="5"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>

        {/* 투두 폼일 때만 카테고리, 날짜 필드 표시 */}
        {pathname.startsWith("/todo") && (
          <>
            <div>
              <label className="block mb-2 text-xl text-white" htmlFor="category">
                Category
              </label>
              <select
                className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="TODO">{TODO_CATEGORY_ICON.TODO} To do</option>
                <option value="PROGRESS">{TODO_CATEGORY_ICON.PROGRESS} On progress</option>
                <option value="DONE">{TODO_CATEGORY_ICON.DONE} Done</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-xl text-white" htmlFor="startDate">
                Start Date
              </label>
              <input
                className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
                type="date"
                id="startDate"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-xl text-white" htmlFor="dueDate">
                Due Date
              </label>
              <input
                className="w-full p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
          </>
        )}

        {/* {isFormInValid && <div className='mt-2 text-red-500'>모든 항목을 채워서 작성해주세요</div>} */}
        <div className="flex justify-end gap-4">
          <button
            className="text-xl text-white"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 text-xl text-red-200"
            type="button"
            onClick={addOrUpdateTodoHandler}
          >
            {isNewTodoForm(children) ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
