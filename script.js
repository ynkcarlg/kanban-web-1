/**
 * Gerenciamento de Estado Simplificado
 */
let state = {
    tasks: []
};

// Função para permitir o drop (necessário por padrão no HTML5)
function allowDrop(event) {
    event.preventDefault();
}

// Quando o arraste começa
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    event.target.classList.add('dragging');
}

// Quando o card é solto em uma coluna
function drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text");
    const card = document.getElementById(cardId);
    
    // Identifica o container de cards da coluna onde foi solto
    const dropzone = event.target.closest('.column').querySelector('.cards-container');
    dropzone.appendChild(card);
    
    card.classList.remove('dragging');
}

// Adicionar nova tarefa
function addNewTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text !== "") {
        const taskId = 'task-' + Date.now();
        createCard(text, taskId);
        input.value = "";
    }
}

// Criar elemento do Card no DOM
function createCard(text, id) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = id;
    card.draggable = true;
    card.innerText = text;

    // Eventos de Drag
    card.ondragstart = drag;
    
    // Editar no Duplo Clique
    card.ondblclick = function() {
        const currentText = this.innerText;
        const inputEdit = document.createElement('input');
        inputEdit.value = currentText;
        
        inputEdit.onblur = function() {
            card.innerText = this.value || currentText;
        };

        inputEdit.onkeydown = function(e) {
            if (e.key === 'Enter') this.blur();
        };

        this.innerText = "";
        this.appendChild(inputEdit);
        inputEdit.focus();
    };

    document.querySelector('#todo .cards-container').appendChild(card);
}