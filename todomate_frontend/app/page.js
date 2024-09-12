"use client";
import { useState, useEffect } from 'react';
import { getUserData } from '../api/userApi';

export default function Home() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const data = await getUserData();
      setUserName(data.username);
    };

    fetchSession();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setUserName(username);
    } else {
      alert('로그인 실패');
    }
  };

  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-700 rounded-xl shadow-md">
        {userName === null ? (
          <>
            <h1 className="text-3xl font-bold text-center text-red-200">로그인</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">아이디</label>
                <input
                  type="text"
                  name="username"
                  className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="로그인"
                  className="w-full py-3 px-4 bg-gray-800  text-white rounded-lg hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center">Welcome, {userName}!</h1>
            <div className="space-y-4">
              <form action="/todos/list" method="get">
                <input
                  type="submit"
                  value="Todo 리스트 보러가기"
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </form>
              <form action="/diaries/list" method="get">
                <input
                  type="submit"
                  value="다이어리 리스트 보러가기"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
