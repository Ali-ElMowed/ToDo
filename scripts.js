let create = document.getElementById("add-todo");
let createPopup = document.getElementById("pop-up");
let cancel = document.getElementById("cancel");
let done= document.getElementById("done");
let edit = document.getElementById("edit");
let deleteTodo = document.getElementById("delete");
let 
$(create).click(function () {
    $(createPopup).css("display", "block");
});

$(cancel).click(function () {
    $(createPopup).css("display", "none");
});


