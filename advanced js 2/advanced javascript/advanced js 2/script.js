const draggableList = document.getElementById("draggable-list"); 
const checkBtn = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Jensen Huang",
  "Bernard Arnault",
  "Rob Walton",
  "Warren Buffett"
];

const listItems = [];
let dragStartIndex;

createList();

// Create shuffled list
function createList() {
  const shuffled = [...richestPeople]
    .map(name => ({ name, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.name);

  shuffled.forEach((person, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-index", index);

    li.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa-solid fa-grip-lines"></i>
      </div>
    `;

    listItems.push(li);
    draggableList.appendChild(li);
  });

  addEventListeners();
}

// Drag start
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

// Drag over
function dragOver(e) {
  e.preventDefault();
}

// Drop
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
}

// Drag enter
function dragEnter() {
  this.classList.add("over");
}

// Drag leave
function dragLeave() {
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {

  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

  // ✅ ADDITION: update listItems array order
  const temp = listItems[fromIndex];
  listItems[fromIndex] = listItems[toIndex];
  listItems[toIndex] = temp;

  // ✅ update data-index values
  updateIndex();

  // update numbering
  updateNumbers();
}

// ✅ ADDITION: update li data-index
function updateIndex() {
  listItems.forEach((item, index) => {
    item.setAttribute("data-index", index);
  });
}

// Update numbering
function updateNumbers() {
  listItems.forEach((item, index) => {
    item.querySelector(".number").innerText = index + 1;
  });
}

// Reset right/wrong classes
function resetClasses() {
  listItems.forEach(item => {
    item.classList.remove("right", "wrong", "over");
  });
}

// Check order
function checkOrder() {
  resetClasses();

  listItems.forEach((listItem, index) => {
    const personName = listItem
      .querySelector(".person-name")
      .innerText
      .trim();

    if (personName === richestPeople[index]) {
      listItem.classList.add("right");
    } else {
      listItem.classList.add("wrong");
    }
  });
}

// Add drag event listeners
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll("#draggable-list li");

  draggables.forEach(item => {
    item.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

checkBtn.addEventListener("click", checkOrder);