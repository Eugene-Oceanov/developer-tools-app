function calcHeight() {
    document.querySelector(".boards").style.height = document.querySelector(".kanban__section").clientHeight - document.querySelector(".workspace-title").clientHeight - document.querySelector(".kanban__panel").clientHeight - 60 + "px";
}
calcHeight();



if (localStorage.getItem("workspace")) {
    document.querySelector(".kanban__workspace").innerHTML = localStorage.getItem("workspace");
}

function addCard() {
    const openFormBtn = document.querySelector(".open-form__btn");
    const form = document.querySelector(".form");
    const addCardBtn = document.querySelector(".add-card__btn");
    const cancelBtn = document.querySelector(".cancel__btn");
    const textarea = document.querySelector(".form__textarea");
    const list = document.querySelector(".list")
    let value;

    openFormBtn.addEventListener("click", () => {
        form.style.display = "block";
        openFormBtn.style.display = "none";
    })
    cancelBtn.addEventListener("click", () => {
        form.style.display = "none";
        openFormBtn.style.display = "block";
    })
    textarea.addEventListener("input", (e) => {
        value = e.target.value;
        if (value) {
            addCardBtn.style.display = "block";
        } else {
            addCardBtn.style.display = "none";
        }
    })
    addCardBtn.addEventListener("click", () => {
        const listItem = document.createElement("DIV");
        listItem.classList.add("list-item");
        listItem.setAttribute("draggable", "true");
        listItem.textContent = textarea.value;
        list.append(listItem);
        textarea.value = "";
        addCardBtn.style.display = "none";
        dragNdrop();
        delCard();
        saveSpace();
    })
}
addCard();

function delCard() {
    const cardsArr = document.querySelectorAll(".list-item");
    cardsArr.forEach((item) => {
        item.addEventListener("dblclick", function () {
            this.remove();
        })
    })
    saveSpace();

}
delCard();

const boardsBlock = document.querySelector(".boards");

function addBoard() {
    const addBoardBtn = document.querySelector(".add-board__btn");
    addBoardBtn.addEventListener("click", () => {
        const boardItem = document.createElement("DIV");
        boardItem.classList.add("boards__item");
        boardItem.innerHTML = `<div contenteditable="true" class="board-title">Введите название</div>
                                <div class="list"></div><img class="del-board" src="img/trash.png">`
        boardsBlock.append(boardItem);
        dragNdrop();
        delBoard();
        saveSpace();
    })
}

addBoard();

function delBoard() {
    const delBtnArr = document.querySelectorAll(".del-board");
    delBtnArr.forEach((item) => {
        item.addEventListener("click", () => {
            item.parentElement.remove();
        })
    })
}
delBoard();

let dragItem;

function dragNdrop() {
    const cardArr = document.querySelectorAll(".list-item");
    cardArr.forEach((item) => {
        item.addEventListener("dragstart", () => {
            dragItem = item;
            setTimeout(() => {
                item.style.display = "none";
            }, 0)
        });
        item.addEventListener("dragend", () => {
            setTimeout(() => {
                item.style.display = "flex";

            }, 0);
            dragItem = null;
        });

        const listArr = document.querySelectorAll(".list");
        listArr.forEach((item) => {
            item.addEventListener("dragover", function (e) {
                e.preventDefault();
            })
            item.addEventListener("dragenter", function () {
                item.style.background = "#444";
            })
            item.addEventListener("dragleave", function () {
                item.style.background = "none";
            })
            item.addEventListener("drop", function () {
                this.append(dragItem);
                item.style.background = "none";
            })
        })
    })
    saveSpace();
}
dragNdrop();

function saveSpace() {
    let ws = document.querySelector(".kanban__workspace").innerHTML;
    const saveSpaceBtn = document.querySelector(".save-space__btn");
    saveSpaceBtn.addEventListener("click", () => {
        localStorage.setItem("workspace", ws);
        console.log(ws);
    })
}
saveSpace();

function clearSpace() {
    const clearSpaceBtn = document.querySelector(".del-space__btn");
    clearSpaceBtn.addEventListener("click", () => {
        if (localStorage.getItem("workspace")) {
            localStorage.removeItem("workspace");
        }
        document.querySelector(".kanban__workspace").innerHTML = `<button class="add-board__btn">+</button>
        <h1 class="workspace-title" contenteditable="true">Назовите пространство</h1>
        <div class="boards d-flex">
            <div class="boards__item">
                <div contenteditable="true" class="board-title">Введите название</div>
                <div class="list">
                    <div class="list-item" draggable="true">Карточка 1</div>
                </div>
                <div class="form">
                    <textarea placeholder="Введите название карточки" class="form__textarea"></textarea>
                    <div class="form__buttons d-flex jc-between">
                        <button class="add-card__btn standart-button">Добавить карточку</button>
                        <button class="cancel__btn standart-button">Отмена</button>
                    </div>

                </div>
                <button class="open-form__btn standart-button">Добавить карточку</button>
            </div>
        </div>`
        addBoard();
        addCard();
    })
}
clearSpace();