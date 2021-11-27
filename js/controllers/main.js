import Task from "../models/task.js";
import TaskService from "../service/task-service.js";

const taskService = new TaskService();
const getELE = (id) => document.getElementById(id);


let isLoading = false; 
const loader = document.getElementsByClassName("loader-container")[0]; 
const checkLoading = () => {
  if (isLoading) {
    document.getElementsByClassName("card")[0].appendChild(loader); 
  } else {
    if (loader) loader.remove(); 
  }
};

const renderDataTodo = (arr) => {
  const html = arr?.reduce((contentHTML, task) => {
    return (contentHTML += `
    <li id="task">
    <span>${task.textTask} </span>
    <div class="buttons">
      <button class="remove" onclick="deleteTask(${task.id})">
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="complete" onclick="updateTaskCompleted(${task.id})">
        <i class="far fa-check-circle"></i>
        <i class="fas fa-check-circle"></i>
      </button>
    </div>
  </li>
        `);
  }, ""); 
  getELE("todo").innerHTML = html;
  isLoading = false;
checkLoading();
};

const fetchDataTodo = () => {
taskService
    .getListTaskApi()
    .then((success) => {
    console.log(success.data);
    const arrTodo = success.data.filter((task) => {
        return task.status === "todo";
    });
    renderDataTodo(arrTodo);
    })
    .catch((error) => {
    console.log(error);
    });
};
fetchDataTodo();

const renderDataCompleted = (arr) => {
  const html = arr?.reduce((contentHTML, task) => {
    return (contentHTML += `
            <li id="task">
                <span>${task.textTask}</span>
                <div class="buttons">
                  <button class="remove" onclick="deleteTask(${task.id})">
                    <i class="fa fa-trash-alt"></i>
                  </button>
                  <button class="complete" onclick="updateTaskTodo(${task.id})">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                  </button>
                </div>
              </li>
            `);
  }, "");
  getELE("completed").innerHTML = html;
  isLoading = false;
checkLoading();
};

const fetchDataCompleted = () => {
  taskService
    .getListTaskApi()
    .then((success) => {
      console.log(success.data);
      const arrCompleted = success.data.filter(
        (task) => task.status === "completed"
      );
      renderDataCompleted(arrCompleted); 
    })
    .catch((error) => {
      console.log(error);
    });
};
fetchDataCompleted();

const addTask = (event) => {
  event.preventDefault();
  const newTask = getELE("newTask").value;
  console.log(newTask);
  if (newTask.length !== 0) {
    const task = new Task(newTask, "todo", ""); 
    isLoading = true;
    checkLoading();
    taskService
      .addTaskApi(task)
      .then(() => {
        alert("Add success");
        fetchDataTodo();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    document.getElementById("newTask").value = "không được để trống nha!";
  }
};
window.addTask = addTask;
document.getElementById("addItem").onclick = addTask;

const deleteTask = (id) => {
    isLoading = true;
      checkLoading();
  taskService
    .deleteTaskApi(id)
    .then(() => {
      alert("Delete success");
      fetchDataTodo();
      fetchDataCompleted(); 
    })
    .catch((error) => {
      console.log(error);
    });
};
window.deleteTask = deleteTask; 

const updateTaskCompleted = (id) => {
  isLoading = true;
  checkLoading();
  taskService.getTaskById(id).then((success) => {
    
    const task = new Task(success.data.textTask, "completed", id); 
    taskService.updateTaskApi(task).then((success) => {
      
      fetchDataTodo();
      fetchDataCompleted(); 
    });
  });
};
window.updateTaskCompleted = updateTaskCompleted;

const updateTaskTodo = (id) => {
  console.log(id);

  isLoading = true;
  checkLoading();
  taskService.getTaskById(id).then((success) => {
    const task = new Task(success.data.textTask, "todo", id);
    taskService.updateTaskApi(task).then(() => {
      fetchDataCompleted();
      fetchDataTodo();
      
    });
  });
};
window.updateTaskTodo = updateTaskTodo;
