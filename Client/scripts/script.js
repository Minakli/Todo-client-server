//Header
const headerWindow = document.querySelector(".header__window");
const headerForm = document.querySelector(".header__form");
const headerInput = document.querySelector(".header__input");
const headerBtnAdd = document.querySelector(".header__btn_add");
//Main
const main = document.querySelector(".main");
const mainTaskList = document.querySelector(".main__task_list");

//Close menu
const closeMenu = document.querySelector(".close__menu");
const closeSelectedBtn = document.querySelector(".close_selected_btn");
const closeAllBtn = document.querySelector(".close__all_btn");

//Generator id
let numId = 0;
localStorage.getItem("numId") ? (numId = localStorage.getItem("numId")) : null;

//Cansel reload because form
headerForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

//Create task array
let tasks = [];
localStorage.getItem("tasks")
  ? (tasks = JSON.parse(localStorage.getItem("tasks")))
  : null;

//Show tasks after reload
tasks.forEach((elem) => {
  createTask();
  showTask(elem);
  if (JSON.parse(localStorage.getItem("tasks"))[0]) {
    main.classList.remove("hide");
    headerWindow.classList.add("header__window_with_main");
  }
});

//Add btn handler
headerBtnAdd.addEventListener("click", () => {
  if (headerInput.value) {
    createTask();
    showTask(tasks[tasks.length - 1]);
    headerWindow.classList.add("header__window_with_main");
    main.classList.remove("hide");
  }
});

//Create object task
function createTask() {
  if (headerInput.value) {
    let task = {
      body: headerInput.value,
      isSelected: false,
      id: "task_Id_" + numId,
    };
    localStorage.getItem("numId")
      ? (numId = localStorage.getItem("numId"))
      : null;
    numId++;
    localStorage.setItem("numId", numId);
    localStorage.getItem("tasks")
      ? (tasks = JSON.parse(localStorage.getItem("tasks")))
      : null;
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    headerInput.value = "";
  }
}

//Show task
function showTask(elem) {
  const taskLi = document.createElement("li");
  taskLi.classList.add("main__task_unit");
  taskLi.setAttribute("id", elem.id);
  const taskBox = document.createElement("input");
  taskBox.classList.add("input__checkBox");
  taskBox.setAttribute("type", "checkbox");
  const taskBody = document.createElement("p");
  taskBody.classList.add("task__body");
  taskBody.textContent = elem.body;
  const taskBtnClose = document.createElement("button");
  taskBtnClose.classList.add("task__close");
  taskBtnClose.textContent = "❌";
  mainTaskList.append(taskLi);
  taskLi.append(taskBox, taskBody, taskBtnClose);

  //Checkbox listener
  taskBox.addEventListener("change", () => {
    taskBody.classList.toggle("task__body_isChecked");
    taskBody.classList.toggle("task__body");
    let currentObj = tasks.find((item) => item.id === taskLi.id);
    taskBox.checked
      ? (currentObj.isSelected = true)
      : (currentObj.isSelected = false);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  //Close single listener
  taskBtnClose.addEventListener("click", () => {
    taskLi.remove();
    console.log(taskLi);
    let index = tasks.findIndex((item) => elem.id === item.id);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (!JSON.parse(localStorage.getItem("tasks"))[0]) {
      main.classList.add("hide");
      headerWindow.classList.remove("header__window_with_main");
    }
  });
}

//Close selected
closeSelectedBtn.addEventListener("click", () => {
  let forDelete = tasks.filter((item) => item.isSelected === true);
  forDelete.forEach((item) => {
    document.getElementById(item.id).remove();
  });
  tasks = tasks.filter((item) => item.isSelected === false);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  if (!tasks[0]) {
    numId = 0;
    localStorage.setItem("numId", numId);
  }
  if (!JSON.parse(localStorage.getItem("tasks"))[0]) {
    main.classList.add("hide");
    headerWindow.classList.remove("header__window_with_main");
  }
});

//Close all
closeAllBtn.addEventListener("click", () => {
  mainTaskList.innerHTML = "";
  localStorage.clear();
  main.classList.add("hide");
  headerWindow.classList.remove("header__window_with_main");
});
// async function taskDrow() {
//   let response = await fetch("http://localhost:3000");
//   let objList = await response.json();}
