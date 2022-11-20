let formInput = document.querySelector(".form__input");
let btnAdd = document.querySelector(".btn_add");
let closeMenu = document.querySelector(".close__menu");
let decorLine = document.querySelector(".decor__line");
let taskList = document.querySelector(".task__list");
let closeSelectedBtn = document.querySelector(".close_selected_btn");
let closeAllBtn = document.querySelector(".close__all_btn");
let sum = 0;
async function taskDrow() {
  let response = await fetch("http://localhost:3000");
  let objList = await response.json();
  console.log(objList);
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
}
btnAdd.addEventListener("click", async () => {
  let response = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: formInput.value,
      isChecked: false,
    }),
  });
  let data = await response.json();
  console.log(data);
  // taskDrow();
});
taskDrow();
closeSelectedBtn.addEventListener("click", () => {});
closeAllBtn.addEventListener("click", () => {
  while (document.querySelector("li")) {
    document.querySelector("li").remove();
    localStorage.clear();
    //innerHTML
  }
});
