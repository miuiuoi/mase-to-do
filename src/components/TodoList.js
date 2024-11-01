
import React from 'react'
import Todo from './Todo'


export default function TodoList({todoList, onCheckBtnClick}) {

  //set key giúp cho react biết component nào có sự thay đổi
  //    về mặt dữ liệu và cập nhật lại component đó
  return (
    <>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo}  onCheckBtnClick={onCheckBtnClick}/>
      ))}
      
    </>
  )
}


