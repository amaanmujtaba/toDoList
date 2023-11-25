$(document).ready(function () {
    const $addButton = $("#add-button");
    const $newItemInput = $("#new-item");
    const $todoList = $("#todo-list");

    $addButton.on("click", function () {
        const newItemText = $newItemInput.val().trim();
        console.log("IT WORKS!");

        if (newItemText !== "") {
            const $listItem = $("<li>").text(newItemText);
            $todoList.append($listItem);
            $newItemInput.val("");
            
        }
    });
});