"use client";
import { useState } from "react";

export default function User({ onLogin }) {
  const [userName, setUserName] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log(username, password);

    await onLogin({ username, password });
    setUserName(username);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-red-200">LOGIN</h1>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            placeholder="아이디를 입력하세요"
            type="text"
            name="username"
            className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            placeholder="비밀번호를 입력하세요"
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
            className="w-full py-5 px-4 bg-gray-800  text-white rounded-lg hover:bg-gray-600  focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </form>
    </>
  );
}
