const itemArray = localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[];

console.log(itemArray);

document.getElementById("enter").addEventListener("click", () =>{
    const item = document.getElementById("item");
    createItem(item)
})

function displayItems(){
    let items = "";
    for(let i=0; i<itemArray.length; i++){
        items += `<div class="item">
        <div class="input-controller">
            <textarea disabled>${itemArray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-trash deleteBtn"></i>
                <i class="fa-solid fa-pen-to-square editBtn"></i>
            </div>
        </div>
        <div class="update-controller">
            <button class="saveBtn">Save</button>
            <button class="cancelBtn">Cancel</button>
        </div>
    </div>`
    
     }
     document.querySelector(".to-do-list").innerHTML = items;
    activateEditListener();
    activateDeleteListener();
    activateSaveListener();
    activateCancelListener();
}

function activateDeleteListener(){
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () => { deleteItem(i); })
        });
}


function activateEditListener(){
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () => {
            updateController[i].style.display = "block";
            inputs[i].disabled = false;
        })
    })
}

function activateSaveListener(){
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i);
        })
    }) 
}

function activateCancelListener(){
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none";
            inputs[i].disabled = true;
            inputs[i].value = itemArray[i];
        })
    })
}
function updateItem(text, i){
    itemArray[i] = text;
    localStorage.setItem("items", JSON.stringify(itemArray));
    location.reload();
}
function deleteItem(i){
    itemArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemArray));
    location.reload();
}
function createItem(item){
    itemArray.push(item.value);
    localStorage.setItem("items", JSON.stringify(itemArray))
    location.reload();
}
function displayDate(){
    let date = new Date();
    date = date.toString().split(" ");
    document.getElementById("date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

window.onload = function(){
    displayDate();
    displayItems();
}





