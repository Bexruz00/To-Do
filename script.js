let elForm = document.querySelector(".todo-form");
let elInputText = document.querySelector(".input-text");
let elInputSubmit = document.querySelector(".input-submit");
let elList = document.querySelector(".list");
let elBtnWrapper = document.querySelector(".btn-wrapper");

let elCompletedButton = document.querySelector(".additional:nth-child(2)");

let isEdit = false;
let isIdex = null;

let todoliST = JSON.parse(localStorage.getItem("todos")) || [];

function renderList(arr, list) {
  list.innerHTML = "";
  arr.forEach((item, index) => {
    let elItem = document.createElement("li");
    elItem.className =
      `flex justify-between items-center border-b-2 hover:bg-[#eeeeeee3] duration-300 p-[15px] rounded-md ${item.completed ? "opacity-[50%]" : ""}`;

    elItem.innerHTML = `
       <div class="flex gap-[5px] font-medium">
        <p class="li-num text-[18px]">${index + 1}.</p>
        <h1 class="li-word ${
          item.completed ? "line-through text-gray-500" : ""
        }">${item.title}</h1>
      </div>
        <div class="flex gap-[5px] items-center">
        <label for="myCheckbox01" class="checkbox">
          <input class="checkbox__input" type="checkbox" ${
            item.completed ? "checked" : ""
          } data-id="${item.id}" id="myCheckbox01">
          <svg class="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" />
            <path class="tick" stroke="#6EA340" fill="none" stroke-linecap="round" stroke-width="4" d="M4 10l5 5 9-9" />
          </svg>
        </label>

          <button id="${
            item.id
          }" class="w-[100px] h-[50px] bg-red-500 text-white rounded-md font-medium">Delete</button>
          <button onclick="hendleClickValue(${
            item.id
          })" class="w-[80px] h-[50px] bg-green-500 text-white rounded-md font-medium">Edit</button>
        </div>
      `;

    list.append(elItem);
  });
  elBtnWrapper.firstElementChild.children[0].textContent = todoliST.length;
  elBtnWrapper.children[1].children[0].textContent = todoliST.filter(
    (item) => item.completed
  ).length;
  elBtnWrapper.lastElementChild.children[0].textContent = todoliST.filter(
    (item) => item.completed !== true
  ).length;
}
renderList(todoliST, elList);

elForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputValue = elInputText.value.trim();

  if (inputValue) {
    if (isEdit) {
      let task = todoliST.find((item) => item.id == isEdit);
      task.title = elInputText.value;
      isEdit = false;
    } else {
      let data = {
        id: todoliST.length + 1,
        title: elInputText.value,
        completed: false,
      };
      todoliST.push(data);
    }
    localStorage.setItem("todos", JSON.stringify(todoliST));
    renderList(todoliST, elList);
    e.target.reset();
  }
});
renderList(todoliST, elList);

elList.addEventListener("click", function (e) {
  if (e.target.textContent == "Delete") {
    const clickId = e.target.id;
    const dalateIdex = todoliST.findIndex((item) => item.id == clickId);
    todoliST.splice(dalateIdex, 1);
    renderList(todoliST, elList);
    localStorage.setItem("todos", JSON.stringify(todoliST));
  }
});

function hendleClickValue(id) {
  const task = todoliST.find((item) => item.id == id);
  elInputText.value = task.title;
  isEdit = true;
  isEdit = id;
}

elList.addEventListener("change", function (e) {
  if (e.target.classList.contains("checkbox__input")) {
    let taskId = e.target.getAttribute("data-id");
    let task = todoliST.find((item) => item.id == taskId);
    task.completed = e.target.checked;
    renderList(todoliST, elList);
  }
  localStorage.setItem("todos", JSON.stringify(todoliST));
});

elBtnWrapper.addEventListener("click", function(e){
  if(e.target.matches(".all-complated-btn")){
    const collektComlitedList = todoliST.filter(item => item.completed)
    renderList(collektComlitedList, elList);
  }else if(e.target.matches(".all-uncomplated-btn")){
    const collektUncomlitedList = todoliST.filter(item => item.completed !== true)
    renderList(collektUncomlitedList, elList);
  }else{
    renderList(todoliST, elList);
  }
  
})