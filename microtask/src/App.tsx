import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  //   todolistID: string
};

function App() {
  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<todolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  function removeTask(todolistID:string, id: string) {
    // const obj = todolistID ===
    setTasks({...tasks, [todolistID]:tasks[todolistID].filter(item => item.id !== id)})
    // let filteredTasks = tasks.filter(t => t.id != id);
    // setTasks(filteredTasks);
  } 

  function addTask(todolistID:string, title: string) {
    // const newArr = tasks[todolistID].push({id:v1(), title:title, isDone:false})
    // let newTask = {id:v1(), title:title, isDone:false}
    setTasks({...tasks, [todolistID]:[{id:v1(), title:title, isDone:false}, ...tasks[todolistID]]})
    // let task = {id: v1(), title: title, isDone: false};
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
  }

  function changeStatus(todoListID: string, taskId: string, isDone: boolean) {

    setTasks({...tasks, [todoListID]: tasks[todoListID].map(task => task.id === taskId ? {...task, isDone} : task)})
  }

  //   let tasksForTodolist = tasks;

  //   if (filter === "active") {
  //     tasksForTodolist = tasks.filter((t) => t.isDone === false);
  //   }
  //   if (filter === "completed") {
  //     tasksForTodolist = tasks.filter((t) => t.isDone === true);
  //   }

  function changeFilter(todolistID: string, value: FilterValuesType) {

 

      setTodolists(todolists.map(item => item.id === todolistID ? {...item, filter: value} : item));


    // setFilter(value);
  }

  return (
    <div className="App">
      {todolists.map((item) => {
        let tasksForTodolist = tasks[item.id];

        if (item.filter === "active") {
          tasksForTodolist = tasks[item.id].filter((t) => t.isDone === false);
        }
        if (item.filter === "completed") {
          tasksForTodolist = tasks[item.id].filter((t) => t.isDone === true);
        }

        return (
          <Todolist
            key={item.id}
            todolistID={item.id}
            title={item.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={item.filter}
          />
        );
      })}

      {/* <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      /> */}
    </div>
  );
}

export default App;
