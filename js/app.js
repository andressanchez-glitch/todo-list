console.log('ciao bello');

//si poteva scrivere anche così:
//document.getElementById('add-button').addEventListener('click,', function(){});

//Get the input field
var addButton = document.getElementById('add-button');

//Execute a function when the user presses a key on the keyboard
addButton.addEventListener('keypress', function (event) {
    //if the user presses the 'Enter' key on the keyboard
    if (event.key === "Enter") {
        //cancel the default action, if needed
        event.preventDefault();
        addToDoItem();
    }
    else {
        addButton.click().addToDoItem();
    }

});

let clearButton = document.getElementById('clear-completed-button');
clearButton.addEventListener('click', function () {
    clearCompletedToDoItems();
});

let emptyButton = document.getElementById('empty-button')
emptyButton.addEventListener('click', emptyList);

let saveButton = document.querySelector('#save-button')
saveButton.addEventListener('click', saveList);


//variabile per il selettore HTML che ho come id todo-entry-box
var toDoEntryBox = document.getElementById('todo-entry-box');

// variabile del selettore HTML che ha come id todo-list
var toDoList = document.getElementById('todo-list');

function newToDoItem(itemText, completed) { // qui dichiaro la funzione 
    let toDoItem = document.createElement('li');
    let toDoText = document.createTextNode(itemText);

    toDoItem.appendChild(toDoText);/* rig 14-15 abbiamo definito la creaxione del listitem, quello che scrivo nel input va 
   a todotext e quando faccio appendchild sto prendendo i listitem e li sto appiopado i valori di item che sono quelli scritti nel input */


    if (completed) {//se è completato 
        toDoItem.classList.add('completed')
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener('dblclick', toggleToDoItemState);//dbclick doppio click
}

function addToDoItem() {
    let itemText = toDoEntryBox.value;
    newToDoItem(itemText, false); // invocazione della fuzione che setta il valore e lo mettiamo dentro a false, guarda se è compltede true oppure no false
}

function toggleToDoItemState() {
    if (this.classList.contains('completed')) {//quando chiamo la funzione faccio un controllo per vedere se l'elemto 
        this.classList.remove('completed');  //che chiama la funzione in questo caso toggle ha completed o no come classe tramite this 
    }
    else {
        this.classList.add('completed');
    }
}


function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName('completed');

    while (completedItems.length > 0) {
        completedItems.item(0).remove();//andiamo a rimuovere il primo elemnto dalla lista
    }
}

function emptyList() {
    let toDoItem = toDoList.children

    while (toDoItem.length > 0) {
        toDoItem.item(0).remove();
    }
}

function saveList() {
    let toDos = [];
    for (let i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children.item(i);//item è un elemnto che ci aiuta a recuperare un milesimo del nostro giro

        var toDoInfo = {
            "task": toDo.innerText, // riesco a fare questo perchè ho in mano gli elemnti di riga 90
            "completed": toDo.classList.contains('completed')// che ho ciclato con il ciclo for e so il valore che ho scritto a schermo 
        };

        toDos.push(toDoInfo);
        
    }
    console.log(toDos);
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

//per caricare la lista per vederla nel broswers

function loadList(){
    if(localStorage.getItem('toDos') != null){// != null controllo per vedere che il valore non sia nullo
        let toDos = JSON.parse(localStorage.getItem('toDos'));

        for(let i = 0; i < toDos.length; i++){ 
            let toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed)//task xk è la chiave il primo elemnto che abbiamo memorizzato
        }
    }
}

loadList();