/*  Esercizio 27a

Modificare il progetto to-do-js in modo tale che:

  1. salvi automaticamernte la lista dopo un certo periodo di tempo
  2. si possa aggiungere un elemento alla lista premendo invio da tastiera o con il click del mouse  */

console.log('collegato')

var addButton = document.getElementById('add-button');

addButton.addEventListener('keypress', function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItem();
  }
  else {
    addButton.addItem();
  };

});

let deleteButton = document.getElementById('delete_db');
deleteButton.addEventListener('click', function () {
  clearButton();
});

let deleteDbAll = document.getElementById('delete_all');
deleteDbAll.addEventListener('click', function () {
  clearAll();
});

let saveButton = document.querySelector('#save');
saveButton.addEventListener('click', function () {
  saveList();
});

var inputBox = document.getElementById('input-list');

var hiddenList = document.getElementById('list-ol');

//invocazione

function newAddItem(itemText, completed) {
  let itemInvented = document.createElement('li');
  let textplot = document.createTextNode(itemText);

  itemInvented.appendChild(textplot);

  if (completed) {
    itemInvented.classList.add('completed')
  }
  hiddenList.appendChild(itemInvented);
  itemInvented.addEventListener('dblclick', function () {
    toggleItemState.call(itemInvented);
  });

}


function addItem() {
  let itemText = inputBox.value;
  newAddItem(itemText, false);
}


function toggleItemState() {
  if (this.classList.contains('completed')) {
    this.classList.remove('completed');
  }
  else {
    this.classList.add('completed');
  }
}

function clearButton() {
  let clearItems = hiddenList.getElementsByClassName('completed');

  for (let i = clearItems.length - 1; i >= 0; i--) {
    clearItems.item(i).remove();
  }
}

function clearAll() {
  let dbItem = hiddenList.children

  while (dbItem.length > 0) {
    dbItem.item(0).remove();
  }
}

function saveList() {
  let toDos = [];
  for (let i = 0; i < hiddenList.children.length; i++) {
    let toDo = hiddenList.children.item(i);

    var toDoInfo = {
      "task": toDo.innerText,
      "completed": toDo.classList.contains('completed')
    };
    toDos.push(toDoInfo);

  }
  console.log(toDos);
  localStorage.setItem('toDos', JSON.stringify(toDos));
}


//per fare in modo che la lista non si salvi se è vuota 
//ovvero se non c'è nessun elemnto
function stopGoInterval() {
  let intervallo = setInterval(saveList, 2000);

  let stopInterval = document.getElementById('list-ol').children;
  console.log(stopInterval);

  if (stopInterval.length == 0) {//la condizione dice che siano vuoti se la lughezza della lista è 0 quindi vuota
    clearInterval(intervallo);
    console.log('clean')
  }
  else {
    saveList();
    console.log('save')
  }
}
setInterval(stopGoInterval, 1000);
//caricare la lista per vederla nel broswers

function loadList() {
  if (localStorage.getItem('toDos') != null) {
    let toDos = JSON.parse(localStorage.getItem('toDos'));

    for (let i = 0; i < toDos.length; i++) {
      let toDo = toDos[i];
      newAddItem(toDo.task, toDo.completed)
    }
  }
}

loadList();


//commento per GitHub



















