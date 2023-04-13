const headerWindow = document.querySelector(".header__window");
const headerForm = document.querySelector(".header__form");
const headerInput = document.querySelector(".header__input");
const headerBtnAdd = document.querySelector(".header__btn_add");
const mainTaskList = document.querySelector(".main__task_list");
const closeMenu = document.querySelector(".close__menu");
const closeSelectedBtn = document.querySelector(".close_selected_btn");
const closeAllBtn = document.querySelector(".close__all_btn");
//Generator id
let numId = 0;
localStorage.getItem("numId") ? (numId = localStorage.getItem("numId")) : null;

headerForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
//Create task array
let tasks = [];
localStorage.getItem("tasks")
  ? (tasks = JSON.parse(localStorage.getItem("tasks")))
  : null;
//Show tasks
tasks.forEach((elem) => {
  createTask();
  showTask(elem);
});

//Header btn handler
headerBtnAdd.addEventListener("click", () => {
  createTask();
  showTask(tasks[tasks.length - 1]);
});
//Create object task
function createTask() {
  if (headerInput.value) {
    let task = {
      body: headerInput.value,
      isSelected: false,
      id: "task_Id_" + numId,
    };
    console.log(task);
    localStorage.getItem("numId")
      ? (numId = localStorage.getItem("numId"))
      : null;
    numId++;
    console.log(numId);
    localStorage.setItem("numId", numId);
    localStorage.getItem("tasks")
      ? (tasks = JSON.parse(localStorage.getItem("tasks")))
      : null;
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
    headerInput.value = "";
  }
}

//Show task
function showTask(elem) {
  const taskLi = document.createElement("li");
  taskLi.classList.add("main__task_unit");
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

  taskBox.addEventListener("change", () => {
    taskBody.classList.toggle("task__body_isChecked");
    taskBody.classList.toggle("task__body");
    if (taskBox.checked) {
      elem.isSelected = true;
    } else {
      elem.isSelected = false;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(elem.isSelected);
  });
}
// async function taskDrow() {
//   let response = await fetch("http://localhost:3000");
//   let objList = await response.json();
//   console.log(objList);

// for (let key in objList) {
//   if (key) {
//     let li = document.createElement("li");
//     li.className = "task__unit";
//     sum += 1;
//     let getId = "li" + sum;
//     li.id = getId;
//     taskList.append(li);
//     let inputCheckbox = document.createElement("input");
//     inputCheckbox.className = "input__checkbox";
//     inputCheckbox.setAttribute("type", "checkBox");
//     li.append(inputCheckbox);
//     let taskBody = document.createElement("p");
//     taskBody.className = "task__body";
//     taskBody.textContent = key.task;
//     li.append(taskBody);
//     let taskClose = document.createElement("button");
//     taskClose.className = "task__close";
//     taskClose.textContent = "❌";
//     taskClose.addEventListener("click", () => {
//       document.getElementById(getId).remove();
//     });
//     li.append(taskClose);
// closeMenu.style.display = "flex";
// formInput.value = "";
//   }
// }
// }
// btnAdd.addEventListener("click", async () => {
//   let response = await fetch("http://localhost:3000", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       task: formInput.value,
//       isChecked: false,
//     }),
//   });
//   let data = await response.json();
//   console.log(data);
// taskDrow();
// });
// taskDrow();
closeSelectedBtn.addEventListener("click", () => {});
closeAllBtn.addEventListener("click", () => {
  while (document.querySelector("li")) {
    document.querySelector("li").remove();
    localStorage.clear();
    //innerHTML
  }
});
