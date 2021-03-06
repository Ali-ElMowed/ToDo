let create = document.getElementById("add-todo");
let createPopup = document.getElementById("pop-up");
let cancel = document.getElementById("cancel");
let done = document.getElementById("done");
let edit = document.getElementById("edit");
let deleteTodo = document.getElementById("delete");
let titile_popup = document.getElementById("title-popup");
let description_popup = document.getElementById("description-popup");
let points_value = document.getElementById("points-value");
let options = document.getElementsByClassName("options");
let create_popup = document.getElementById("create-popup");
let todo_list_container = document.getElementById("todo-list-container");
let todo_box = document.getElementsByClassName("todo-box");
let search_input = document.getElementById("search-input");
let search_btn = document.getElementById("search-btn");
//let create_at_div = getElementById("created-at");


let update = false;
let tmp;

// aray to store todos
let todo_data;
// To avoid making the array null every time
if (localStorage.todos != null) {
    todo_data = JSON.parse(localStorage.todos);
}
else {
    todo_data = [];
}

$(create).click(function () {
    $(createPopup).css("display", "block");
});

$(cancel).click(function () {
    $(createPopup).css("display", "none");
});

$(create_popup).click(function () {
    let now = new Date(Date.now());
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    // Creatin an object to store the todo data
    if (titile_popup.value != '' && /*description_popup.value != '' &&*/ points_value.value != '') {
        if (update == false) {
            let todo_object = {
                title: $(titile_popup).val(),
                points: $('#points-value').val(),
                description: $(description_popup).val(),
                created_at: time
            }
            todo_data.push(todo_object);
            localStorage.setItem('todos', JSON.stringify(todo_data));
            console.log(todo_data);
        }
        else {
            todo_data[tmp].title = titile_popup.value;
            todo_data[tmp].description = description_popup.value;
            todo_data[tmp].points = points_value.value;
            localStorage.setItem('todos', JSON.stringify(todo_data));
            clearValues();
            displayTodos();
            update = false;
            create_popup.innerHTML = "Create";
            location.reload();

        }
        clearValues();
        displayTodos();
        location.reload();
    }
    else {
        alert("Please fill all the fields");
    }
});


// function to clear input fields and close the popup
function clearValues() {
    titile_popup.value = '';
    description_popup.value = '';
    points_value.value = '';
    $(createPopup).css("display", "none");
}


// function to display the todos
function displayTodos() {
    let todo = '';
    for (let i = 0; i < todo_data.length; i++) {
        todo = `
        <div class="todo-box">
            <div class="todo-box-left">
                <div class="todo-top">
                    <h1 id="title">${todo_data[i].title}</h1>
                    <h1 id="points">${todo_data[i].points} &#9733</h1>
                </div>
                <div class="description">
                    <p id="description-para">${todo_data[i].description}</p>
                </div>
            </div>
            <div class="todo-box-right">
                <div class="done bg" id="done" onclick="isDone(${i})"><i class="fa-solid fa-check"></i></div>
                <div class="edit bg" id="edit" onclick="editToDo(${i})"><i class="fa-solid fa-pen"></i></div>
                <div class="delete bg" id="delete" onclick="deleteToDo(${i})" ><i class="fa-solid fa-trash"></i></div>
                <div class="created-at" id="created-at">Created at ${todo_data[i].created_at}</div>
            </div>
    </div>
        `;
        todo_list_container.innerHTML += todo;

    }
}

// Delete to do function

function deleteToDo(id) {
    displayTodos();
    todo_data.splice(id, 1);
    localStorage.todos = JSON.stringify(todo_data);
    location.reload();
}

displayTodos();

function editToDo(id) {
    //alert("edit");
    $(createPopup).css("display", "block");
    titile_popup.value = todo_data[id].title;
    description_popup.value = todo_data[id].description;
    points_value.value = todo_data[id].points;
    create_popup.innerHTML = "Update";
    tmp = id;
    update = true;

}

function isDone(id) {
    todo_box[id].classList.toggle("is-done");
}

$(search_input).keyup(function () {
    let search_value = $(search_input).val();
    let search_result = '';
    for (let i = 0; i < todo_data.length; i++) {
        if (todo_data[i].title.includes(search_value) || todo_data[i].description.includes(search_value)) {
            search_result = `
            <div class="todo-box">
            <div class="todo-box-left">
                <div class="todo-top">
                    <h1 id="title">${todo_data[i].title}</h1>
                    <h1 id="points">${todo_data[i].points} &#9733</h1>
                    </div>
                    <div class="description">
                        <p id="description-para">${todo_data[i].description}</p>
                        </div>
                        </div>
                        <div class="todo-box-right">
                            <div class="done bg" id="done" onclick="isDone(${i})"><i class="fa-solid fa-check"></i></div>
                            <div class="edit bg" id="edit" onclick="editToDo(${i})"><i class="fa-solid fa-pen"></i></div>
                            <div class="delete bg" id="delete" onclick="deleteToDo(${i})" ><i class="fa-solid fa-trash"></i></div>
                            <div class="created-at" id="created-at">Created at ${todo_data[i].created_at}</div>
                            </div>
                            </div>
                            `;
            todo_list_container.innerHTML += search_result;
            
        }

    }
}
);




// $(search_btn).click(function searchToDo() {
//     console.log("search");
//     for(todo of todo_data){
//         if(todo.title.toLowerCase().includes($(search_input).val().toLowerCase()) || todo.description.toLowerCase().includes($(search_input).val())){
//             let search_result = `
//             <div class="todo-box">
//             <div class="todo-box-left">
//                 <div class="todo-top">
//                     <h1 id="title">${todo.title}</h1>
//                     <h1 id="points">${todo.points} &#9733</h1>
//                 </div>
//                 <div class="description">
//                     <p id="description-para">${todo.description}</p>
//                 </div>
//             </div>
//             <div class="todo-box-right">
//                 <div class="done bg" id="done" onclick="isDone(${i})"><i class="fa-solid fa-check"></i></div>
//                 <div class="edit bg" id="edit" onclick="editToDo(${i})"><i class="fa-solid fa-pen"></i></div>
//                 <div class="delete bg" id="delete" onclick="deleteToDo(${i})" ><i class="fa-solid fa-trash"></i></div>`;
//             todo_list_container.innerHTML = search_result;
//         }
//     }
// });




    
    // let todo = '';
    // for (let i = 0; todo_data.length; i++) {
    //     if (todo_data[i].title.includes("a") || todo_data[i].description.includes("a")) {
    //         todo = `
    //         <div class="todo-box">
    //         <div class="todo-box-left">
    //             <div class="todo-top">
    //                 <h1 id="title">${todo_data[i].title}</h1>
    //                 <h1 id="points">${todo_data[i].points} &#9733</h1>
    //             </div>
    //             <div class="description">
    //                 <p id="description-para">${todo_data[i].description}</p>
    //             </div>
    //         </div>
    //         <div class="todo-box-right">
    //             <div class="done bg" id="done" onclick="isDone(${i})"><i class="fa-solid fa-check"></i></div>
    //             <div class="edit bg" id="edit" onclick="editToDo(${i})"><i class="fa-solid fa-pen"></i></div>
    //             <div class="delete bg" id="delete" onclick="deleteToDo(${i})" ><i class="fa-solid fa-trash"></i></div>
    //             <div class="created-at" id="created-at">Created at ${todo_data[i].created_at}</div>
    //         </div>
    //     </div>
    //         `
    //     }
    //     todo_list_container.innerHTML = todo;
    // }




function sortByPoints(){
$(todo_list_container).text("");
    todo_data.sort((firstToDo,seconToDo)=> firstToDo.points - seconToDo.points);
    displayTodos();
}

