$(function () {
	$("#clear").click(function () {
		localStorage.clear();
		load();
	})
})

$(function () {
	$("#form").submit(function () {
		var $title = $("#title");
		if ($title.val() == "") {
			alert("error");
		} else {
			var data = loadData();
			var todo = { "title": $title.val(), "done": false };
			data.push(todo);
			saveData(data);
			var $form = $("#form");
			$form[0].reset();
			load();
		}
	})
})

function loadData() {
	var collection = localStorage.getItem("todo");
	if (collection != null) {
		return JSON.parse(collection);
	}
	else return [];
}

function saveSort() {
	var data = [];
	for (i = 0; i < $("#todolist p").length; i++) {
		var todo = { "title": $("#todolist p")[i].innerHTML, "done": false };
		data.unshift(todo);
	}
	for (i = 0; i < $("#donelist p").length; i++) {
		var todo = { "title": $("#donelist p")[i].innerHTML, "done": true };
		data.unshift(todo);
	}
	saveData(data);
}

function saveData(data) {
	localStorage.setItem("todo", JSON.stringify(data));
}

function remove(i) {
	var data = loadData();
	var todo = data.splice(i, 1)[0];
	saveData(data);
	load();
}

function update(i, field, value) {
	var data = loadData();
	var todo = data.splice(i, 1)[0];
	todo[field] = value;
	data.splice(i, 0, todo);
	saveData(data);
	load();
}

function edit(i) {
	load();
	var $p = $("p-" + i);
	title = $p.innerHTML;
	$p.innerHTML = "<input id='input-" + i + "' value='" + title + "' />";
	var $input = $("input-" + i);
	$input.setSelectionRange(0, $input.val().length);
	$input.focus();
	$input.onblur = function () {
		if ($input.val().length == 0) {
			$p.innerHTML = title;
			alert("error");
		}
		else {
			update(i, "title", $input.value);
		}
	};
}

function load() {
	// var todolist = document.getElementById("todolist");
	// var donelist = document.getElementById("donelist");
	var collection = localStorage.getItem("todo");
	if (collection != null) {
		var data = JSON.parse(collection);
		var todoCount = 0;
		var doneCount = 0;
		var todoString = "";
		var doneString = "";
		for (var i = data.length - 1; i >= 0; i--) {
			if (data[i].done) {
				doneString += "<li draggable='true'><input type='checkbox' onchange='update(" + i + ",\"done\",false)' checked='checked' />"
					+ "<p id='p-" + i + "' onclick='edit(" + i + ")'>" + data[i].title + "</p>"
					+ "<a href='javascript:remove(" + i + ")'>-</a></li>";
				doneCount++;
			}
			else {
				todoString += "<li draggable='true'><input type='checkbox' onchange='update(" + i + ",\"done\",true)' />"
					+ "<p id='p-" + i + "' onclick='edit(" + i + ")'>" + data[i].title + "</p>"
					+ "<a href='javascript:remove(" + i + ")'>-</a></li>";
				todoCount++;
			}
		};
		todocount.innerHTML = todoCount;
		todolist.innerHTML = todoString;
		donecount.innerHTML = doneCount;
		donelist.innerHTML = doneString;
	}
	else {
		todocount.innerHTML = 0;
		todolist.innerHTML = "";
		donecount.innerHTML = 0;
		donelist.innerHTML = "";
	}

	var lis = todolist.querySelectorAll('ol li');
	[].forEach.call(lis, function (li) {
		li.addEventListener('dragstart', handleDragStart, false);
		li.addEventListener('dragover', handleDragOver, false);
		li.addEventListener('drop', handleDrop, false);

		onmouseout = function () {
			saveSort();
		};
	});
}

window.onload = load;

window.addEventListener("storage", load, false);

var dragSrcEl = null;
function handleDragStart(e) {
	dragSrcEl = this;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.dataTransfer.dropEffect = 'move';
	return false;
}
function handleDrop(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	if (dragSrcEl != this) {
		dragSrcEl.innerHTML = this.innerHTML;
		this.innerHTML = e.dataTransfer.getData('text/html');
	}
	return false;
}