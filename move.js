let elForm = document.querySelector(".todo-form");
let elInputText = document.querySelector(".input-text");
let elList = document.querySelector(".list");

let elCompletedButton = document.querySelector(".additional:nth-child(2)");

let isEdit = false;
let isIdex = null

let todoliST = JSON.parse(localStorage.getItem("todos")) || [];

// Form yuborilganda
elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputValue = elInputText.value.trim();
  
    if (inputValue) {
      if (isEdit) {
        let task = todoliST.find((item) => item.id === isEdit);
        task.title = elInputText.value;
        isEdit = false;
      } else {
        let newTask = {
          id: todoliST.length + 1,
          title: elInputText.value,
          completed: false,
        };
        todoliST.push(newTask);
      }
      localStorage.setItem("todos", JSON.stringify(todoliST));
      renderList(todoliST, elList);
      elForm.reset();
    }
  });

// Funksiya: Vazifalarni render qilish
function renderList(arr, list) {
  list.innerHTML = "";
  arr.forEach((item, index) => {
    let elItem = document.createElement("li");
    elItem.className = "flex justify-between items-center border-b-2 hover:bg-[#eeeeeee3] duration-300 p-[15px] rounded-md";

    elItem.innerHTML = `
      <div class="flex gap-[5px] font-medium">
        <p class="li-num text-[18px]">${index + 1}.</p>
        <h1 class="li-word ${item.completed ? 'line-through text-gray-500' : ''}">${item.title}</h1>
      </div>
      <div class="flex gap-[5px] items-center">
        <label class="checkbox">
          <input class="checkbox__input" type="checkbox" ${item.completed ? 'checked' : ''} data-id="${item.id}">
          <svg class="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
            <rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" />
            <path class="tick" stroke="#6EA340" fill="none" stroke-linecap="round" stroke-width="4" d="M4 10l5 5 9-9" />
          </svg>
        </label>
        <button id="${item.id}" class="w-[100px] h-[50px] bg-red-500 text-white rounded-md font-medium">Delete</button>
        <button onclick="hendleClickValue(${item.id})" class="w-[80px] h-[50px] bg-green-500 text-white rounded-md font-medium">Edit</button>
      </div>
    `;
    list.append(elItem);
  });
}

renderList(todoliST, elList)

// Funksiya: Checkbox bosilganda
elList.addEventListener("change", function (e) {
  if (e.target.classList.contains("checkbox__input")) {
    let taskId = e.target.getAttribute("data-id");
    let task = todoliST.find((item) => item.id == taskId);
    task.completed = e.target.checked;

    if (task.completed) {
      completedCount++;
    } else {
      completedCount--;
    }
    elCompletedButton.textContent = `Complated (${completedCount})`;
    localStorage.setItem("todos", JSON.stringify(todoliST));
    renderList(todoliST, elList);
  }
});

elList.addEventListener("click", function(e){
    if(e.target.textContent == "Delete"){
      const clickId = e.target.id
      const dalateIdex = todoliST.findIndex(item => item.id == clickId)
      todoliST.splice(dalateIdex, 1)
      renderList(todoliST, elList)
      localStorage.setItem("todos", JSON.stringify(todoliST))
    
    }
  })

  function hendleClickValue(id){
    const findObj = todoliST.find(item => item.id == id)
    elInputText.value = findObj.title
    isEdit = true
    isEdit = id
  }


// Dastlabki render
completedCount = todoliST.filter((item) => item.completed).length;
elCompletedButton.textContent = `Complated (${completedCount})`;
renderList(todoliST, elList);
