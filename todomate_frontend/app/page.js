"use client";
import { useState } from "react";
import LoginForm from "@/components/user/LoginForm";
import TodoForm from '@/components/todo/TodoPage'

export default function Page() {
  const [userName, setUserName] = useState(null);

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    const response = await postUserData({ username, password });

    if (response.ok) {
      setUserName(username);
    } else {
      alert('로그인 실패');
    }
  };


  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center">
      <div className="w-full max-w-md p-7 space-y-8 bg-gray-700 rounded-xl shadow-md">
        {userName === null ? <LoginForm onLogin={handleLogin} /> : <TodoForm />}
      </div>
    </div>
  );
}
