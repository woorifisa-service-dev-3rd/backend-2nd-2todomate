"use client";
import React, { useEffect, useState } from "react";
import IconButton from "@/components/ui/IconButton";
import { TODO_option_ICON } from "@/constants/icon";

const TodoItemV2 = ({
  todo,             // todo 또는 diary가 될 수 있음
  draggable,
  onUpdate,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  dragging,
  startPath        // "/todo" 또는 "/diary"로 시작하는 경로
}) => {
  const isTodo = startPath.startsWith("/todo"); // startPath로 구분
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(isTodo ? todo.summary : todo.content);
  const [option, setOption] = useState(isTodo ? todo.option : "");
  const [startDate, setStartDate] = useState(isTodo ? todo.startDate : "");
  const [dueDate, setDueDate] = useState(isTodo ? todo.dueDate : "");
  const [isInValid, setIsInValid] = useState(false);

  const updateHandler = () => {
    if (title === "" || (isTodo && content === "" && startDate === "" && dueDate === "")) {
      setIsInValid(true);
      return;
    }

    setIsUpdateMode(false);
    setIsInValid(false);

    const updateItem = {
      id: todo.id,
      title,
      ...(isTodo && { summary: content, option, startDate, dueDate }),  // todo일 때만 나머지 필드 포함
      ...(!isTodo && { content })  // diary일 때 content만 포함
    };

    onUpdate(updateItem);
  };

  const backHandler = () => {
    setTitle(todo.title);
    setContent(isTodo ? todo.summary : todo.content);
    if (isTodo) {
      setStartDate(todo.startDate);
      setDueDate(todo.dueDate);
    }
    setIsUpdateMode(false);
    setIsInValid(false);
  };

  useEffect(() => {
    if (
      title !== todo.title ||
      (isTodo && (content !== todo.summary || startDate !== todo.startDate || dueDate !== todo.dueDate)) ||
      (!isTodo && content !== todo.content)
    ) {
      setIsUpdateMode(true);
    }

    if (title !== "" && (isTodo ? content !== "" && startDate !== "" && dueDate !== "" : content !== "")) {
      setIsInValid(false);
    }
  }, [title, content, startDate, dueDate]);

  return (
    <li
      className={`flex gap-4 justify-between my-4 py-4 px-4 border-[1px] bg-gray-700 rounded-md shadow-xl h-auto cursor-pointer ${dragging ? "shadow-white shadow-lg" : ""
        }`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="w-4/5">
        <div className="flex space-x-4">
          <span className="text-lg font-medium text-gray-300">
            {isTodo && (
              <IconButton
                icon={TODO_option_ICON[option]}
                onClick={() => {
                  if (option === "TODO") setOption("PROGRESS");
                  else if (option === "PROGRESS") setOption("DONE");
                  else setOption("TODO");
                }}
              />
            )}
          </span>
          <span>
            <div>디데이</div>
          </span>
        </div>
        <div className="flex flex-col mt-2 w-full">
          <input
            type="text"
            data-test="title"
            value={title}
            maxLength={20}
            className="mb-0 text-lg font-bold text-gray-100 uppercase bg-transparent pt-2 pb-2"
            onChange={(event) => setTitle(event.target.value)}
          />
          {isTodo ? (
            <>
              <textarea
                value={content}
                className="text-base text-gray-200 bg-transparent pt-2 pb-2 resize-none"
                rows={1}
                maxLength={80}
                onChange={(event) => setContent(event.target.value)}
                onInput={(event) => {
                  event.target.style.height = "auto";
                  event.target.style.height = `${event.target.scrollHeight}px`;
                }}
              />
              <div className="flex space-x-4">
                <input
                  type="date"
                  className="w-1/2 p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
                <input
                  type="date"
                  className="w-1/2 p-2 border-[1px] border-gray-300 bg-gray-200 text-gray-900 rounded"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                />
              </div>
            </>
          ) : (
            <textarea
              value={content}
              className="text-base text-gray-200 bg-transparent pt-2 pb-2 resize-none"
              rows={3}
              maxLength={200}
              onChange={(event) => setContent(event.target.value)}
            />
          )}

          {isInValid && (
            <div className="mt-2 text-red-500">
              모든 항목을 채워서 작성해주세요
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        {isUpdateMode && (
          <>
            <IconButton icon={"❌"} onClick={backHandler} />
            <IconButton icon={"💾"} onClick={updateHandler} />
          </>
        )}
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
