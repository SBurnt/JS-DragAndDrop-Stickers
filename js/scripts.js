var newNote = document.querySelector(".newnote");
var board = document.querySelector(".board");

var notes = [];
var numberInt = parseInt("1");

/// 1. Creating Note Data
function go() {

	var newPosX = Math.floor(Math.random() * (250 - 20 + 1)) + 20;
	// console.log("pos X " + newPosX);
	var newPosY = Math.floor(Math.random() * (250 - 20 + 1)) + 20;
	// console.log("pos Y " + newPosY);

	var eachNote = {
		text: "",
		posX: newPosX,
		posY: newPosY,
	};
	notes.push(eachNote);
	//console.log(notes);
	createHtml(notes);
}

function createEachNote(text, posX, posY, index) {

	var newDivNote = document.createElement("div");
	newDivNote.setAttribute("class", "note");
	newDivNote.style.left = posX + "px";
	newDivNote.style.top = posY + "px";
	board.appendChild(newDivNote);

	var newDivTextInfoNote = document.createElement("div");
	newDivTextInfoNote.setAttribute("class", "textInfoNote");
	newDivTextInfoNote.textContent = index + numberInt + " - Title";
	newDivNote.appendChild(newDivTextInfoNote);

	var newTextareaNote = document.createElement("textarea");
	newTextareaNote.setAttribute("class", "textareaNote");
	newTextareaNote.placeholder = "Введите вашу заметку";
	newTextareaNote.textContent = text;
	newDivNote.appendChild(newTextareaNote);

	var newPTextFromTextarea = document.createElement("p");
	newPTextFromTextarea.setAttribute("class", "textFromTextarea");
	if (text == "") {
		newDivNote.appendChild(newPTextFromTextarea);
	} else {
		newPTextFromTextarea.textContent = newTextareaNote.value;
		newDivNote.appendChild(newPTextFromTextarea);
		newTextareaNote.style.display = "none";
		newPTextFromTextarea.style.display = "block";
	}

	var spanRemoveNote = document.createElement("span");
	spanRemoveNote.setAttribute("class", "removeNote");
	newDivTextInfoNote.appendChild(spanRemoveNote);
	spanRemoveNote.onclick = function () {
		notes.splice(index, 1);
		// console.log("после удаления элМас");
		// console.log(notes);
		createHtml(notes);
	}

	newDivNote.ondblclick = function () {
		newTextareaNote.style.display = "block";
		newPTextFromTextarea.style.display = "none";
		spanRemoveNote.style.display = "none";
		spanSaveNote.style.display = "inline";
	}

	var spanSaveNote = document.createElement("span");
	spanSaveNote.setAttribute("class", "saveNote");
	newDivTextInfoNote.appendChild(spanSaveNote);

	/// Dimensions
	var width = newDivNote.clientWidth;
	var innerWidth = newDivNote.scrollWidth;
	var offTop = newDivNote.offsetTop;

	////Tracking Mouse
	window.onmousemove = function (e) {
		var clX = e.clientX;
		var clY = e.clientY;
		//console.log("Client mouse pos is " + clX + " " + clY); /// Relative to visible area
		var scrX = e.screenX;
		var scrY = e.screenY;
		// console.log("Screen mouse pos is " + scrX + " " + scrY); /// Relative to computer screen
		var pX = e.pageX;
		var pY = e.pageY;
		//console.log("Page mouse pos is " + pX + " " + pY); /// Relative to page dimentions
	}

	var deltaX, deltaY;

	function trackMouse(e) {
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		newDivNote.style.top = (mouseY - deltaY) + "px";
		newDivNote.style.left = (mouseX - deltaX) + "px";
		notes[index].posX = mouseX - deltaX;
		notes[index].posY = mouseY - deltaY;
	}

	newDivNote.onmousedown = function (e) {
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var offLeft = newDivNote.offsetLeft;
		var offTop = newDivNote.offsetTop;
		deltaX = mouseX - offLeft;
		deltaY = mouseY - offTop;
		window.addEventListener("mousemove", trackMouse);
	}

	newDivNote.onmouseup = function () {
		window.removeEventListener("mousemove", trackMouse);
	}

	spanSaveNote.onclick = function () {
		newPTextFromTextarea.textContent = newTextareaNote.value;
		newTextareaNote.style.display = "none";
		newPTextFromTextarea.style.display = "block";
		notes[index].text = newTextareaNote.value;
		spanSaveNote.style.display = "none";
		spanRemoveNote.style.display = "inline";
		// console.log("добавили текст ");
		// console.log(notes);
		createHtml(notes);
	}
}

function createHtml(arr) {
	board.innerHTML = "";
	for (var i = 0; i < arr.length; i++) {
		createEachNote(arr[i].text, arr[i].posX, arr[i].posY, i);
	}
}

newNote.onclick = go;