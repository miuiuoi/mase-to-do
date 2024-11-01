import './App.css';
import TodoList from './components/TodoList';
import { Button, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';
function App() {
  //state, props
  //state là các dữ liệu nội tại của các component hiện tại
  //props là các dữ liệu được truyền từ các component cha sang các component con
  const [todoList, setTodoList] = useState([]);//array
  const [textInput , setTextInput] = useState("");//empty String

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList))
    console.log("Saved to localStorage:", todoList);
  }, [todoList])
  //useEffect có 2 tham số là 1 func và 1 arr dependency
  //nó hoạt động như một lifecycle componentdidmount trong class component

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value)
  }, []);
  //e là event
  //sử dụng useCallback để khi App re render thì ko khởi tạo lại biến onText.. onAdd..

  const onAddBtnClick = useCallback((e) => {
    const newTodo = { id: v4(), name: textInput, isCompleted: false };

  // Cập nhật danh sách todo
  setTodoList([...todoList, newTodo]); // Sử dụng spread operator đúng cách
  setTextInput(''); // Xóa input sau khi thêm
  }, [textInput, todoList] )

  const onCheckBtnClick = useCallback((id) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id ? {...todo, isCompleted:true} : todo))
  }, [])

  return (
    <div>
      <h3>Danh sách việc cần làm</h3>
      <Input 
        name='add-todo' 
        placeholder='Thêm việc cần làm'
        suffix={
          <Button 
            disabled={!textInput} 
            type='primary'
            onClick={onAddBtnClick}
          >Thêm</Button>
        }
        value={textInput}
        onChange={onTextInputChange}
      ></Input>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
      
      
    </div>
    
  );
}

export default App;
