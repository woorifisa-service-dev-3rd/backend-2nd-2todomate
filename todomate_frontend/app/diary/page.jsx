"use client";
import { useState, useEffect } from "react";
import TodoBody from "@/components/todo/TodoBody";
import Header from "@/components/common/Header";
import DefaultLayout from "@/components/common/DefaultLayout";
import { getDiaries } from "@/api/diaryApi";  // Updated import for Diary API

export default function DiaryPage() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const loadDiaries = async () => {
      try {
        const data = await getDiaries();
        console.log(data);
        setDiaries(data);
      } catch (error) {
        console.error("Failed to fetch diaries:", error);
      }
    };
    loadDiaries();
  }, []);

  // Diary 등록 기능, 파라미터로 새롭게 추가할 Diary 객체를 받음
  const addDiaryHandler = ({ title, content }) => {
    const newDiary = {
      id: self.crypto.randomUUID(), // Web Crypto API
      title,
      content,
    };
    const updatedDiaries = [...diaries, newDiary];
    setDiaries(updatedDiaries);
  };

  // Diary 수정 기능, 파라미터로 업데이트할 Diary 객체를 받음
  const updateDiaryHandler = (updateDiary) => {
    const updatedDiaries = diaries.map((diary) =>
      diary.id === updateDiary.id ? updateDiary : diary
    );
    setDiaries(updatedDiaries);
  };

  // Diary 삭제 기능
  const deleteDiaryHandler = (id) =>
    setDiaries(diaries.filter((diary) => diary.id !== id));

  return (
    <>
      <DefaultLayout>
        <header>
          <div className="flex justify-center">
            <a href="/" className="flex">
              <h1 className="py-8 text-red-200 max-w-max text-7xl">Diaries</h1>
            </a>
          </div>
        </header>
        <section className="max-w-xl m-4 mx-auto">
          <Header
            onAdd={addDiaryHandler}
          />
          <TodoBody
            setDiaries={setDiaries}
            onUpdate={updateDiaryHandler}
            onDelete={deleteDiaryHandler}
          />
        </section>
      </DefaultLayout>
    </>
  );
}
