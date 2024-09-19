import DefaultLayout from '@/components/common/DefaultLayout'
import TodoBody from "@/components/todo/TodoBody";
import Header from '@/components/common/Header'
import React from 'react'

export default function diary() {
  return (
    <div>
      <DefaultLayout>
        <header>
          <div className="flex justify-center">
            <a to="/" className="flex">
              <h1 className="py-8 text-red-200 max-w-max text-7xl">Diaries</h1>
            </a>
          </div>
        </header>
        <section>
           <Header/>
           {/* <TodoBody
    
            setTodos={setTodos}
            onUpdate={updateTodoHandler}
            onDelete={deleteTodoHandler}
          /> */}
        </section>
      </DefaultLayout>
    </div>
  );
}
