"use client";
import React, { useEffect, useState } from "react";
import IconButton from "@/components/ui/IconButton";
import { TODO_CATEGORY_ICON } from "@/constants/icon";

const TodoItemV2 = ({
  todo,
  draggable,
  onUpdate,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  dragging,
}) => {
  // const [openModal, open] = useState(false);
  // const closeModal = () => open(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [summary, setSummary] = useState(todo.summary);
  const [category, setCategory] = useState(todo.category);
  const [startDate, setStartDate] = useState(todo.startDate);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [isInValid, setIsInValid] = useState(false);

  // useEffect로 상태 값이 제대로 설정되는지 확인
  useEffect(() => {
    console.log("Todoitemv2");
    console.log("Title: ", title);
    console.log("Summary: ", summary);
    console.log("Category: ", category);
    console.log("StartDate: ", startDate);
    console.log("DueDate: ", dueDate);
  }, [title, summary, category, startDate, dueDate]);

  const updateHandler = () => {
    if (title === "" || summary === "") {
      setIsInValid(true);
      return;
    }

    setIsUpdateMode(false);
    setIsInValid(false);

    const updateTodo = {
      id: todo.id,
      title,
      summary,
      category,
      startDate,
      dueDate,
    };
    onUpdate(updateTodo);
  };

  const backHandler = () => {
    setTitle(todo.title);
    setSummary(todo.summary);
    setStartDate(todo.startDate);
    setDueDate(todo.dueDate);
    setIsUpdateMode(false);
    setIsInValid(false);
  };

  const changCategoryHandler = () => {
    if (category === "TODO") setCategory("PROGRESS");
    else if (category === "PROGRESS") setCategory("DONE");
    else setCategory("TODO");
  };

  useEffect(() => {
    if (
      title !== todo.title ||
      summary !== todo.summary ||
      startDate !== todo.startDate ||
      dueDate !== todo.dueDate
    ) {
      setIsUpdateMode(true);
    }

    if (title !== "" && summary !== "" && startDate !== "" && dueDate !== "") {
      setIsInValid(false);
    }
  }, [title, summary, startDate, dueDate]);

  useEffect(() => {
    updateHandler();
  }, [category]);

  return (
    <li
      className={`flex gap-4 justify-between my-4 py-4 px-4 border-[1px] bg-gray-700 rounded-md shadow-xl h-auto cursor-pointer ${
        dragging ? "shadow-white shadow-lg" : ""
      }`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="w-4/5">
        <span className="text-lg font-medium text-gray-300">
          {/* {TODO_CATEGORY_ICON[todo.category]} */}
          <IconButton
            icon={TODO_CATEGORY_ICON[category]}
            onClick={changCategoryHandler}
          />
        </span>
        <div className="flex flex-col mt-2 w-full">
          <input
            type="text"
            data-test="title"
            value={title}
            maxLength={20}
            className="mb-0 text-lg font-bold text-gray-100 uppercase bg-transparent pt-2 pb-2"
            onChange={(event) => setTitle(event.target.value)}
          />
          {/* <input
            type="text"
            value={summary}
            className="text-base text-gray-200 bg-transparent pt-2 pb-2"
            onChange={(event) => setSummary(event.target.value)}
          /> */}
          <textarea
            value={summary}
            className="text-base text-gray-200 bg-transparent pt-2 pb-2 resize-none"
            rows={1} // 기본 행 수 설정
            maxLength={80}
            onChange={(event) => setSummary(event.target.value)}
            onInput={(event) => {
              event.target.style.height = "auto"; // 높이를 자동으로 조절하기 위해 초기화
              event.target.style.height = `${event.target.scrollHeight}px`; // 내용에 따라 높이를 설정
            }}
          />

          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />

          {isInValid && (
            <div className="mt-2 text-red-500">
              모든 항목을 채워서 작성해주세요
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* 수정 사항이 있을 때, 저장 버튼 생성 */}
        {isUpdateMode ? <IconButton icon={"❌"} onClick={backHandler} /> : ""}
        {isUpdateMode ? <IconButton icon={"💾"} onClick={updateHandler} /> : ""}
        <IconButton
          textColor="text-red-300"
          icon={"🗑"}
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </li>
  );
};

export default TodoItemV2;
