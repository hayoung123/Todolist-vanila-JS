const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  //console.dir에서 부모가 누군지 저장돼 있는key가 parentNode라는것을 발견
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //지워진 li를 제외하고 새로운 cleanToDos만들기
  const cleanToDos = toDos.filter(function (toDo) {
    //li 아이디가 string로 돼있기때문에 바꿔주어야한다.
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  //cleanToDos로 바뀐 array를 local에 저장.
  saveToDos();
}

function saveToDos() {
  //localStorage에 object를 string로 저장하기 위해 JSON사용
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const toDoLi = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  const toDoSpan = document.createElement("span");
  const newId = toDos.length + 1;
  toDoSpan.innerText = text; //text는 handleToDoSubmit()에서 받아온것
  //toDoLi(li 태그) 안에 버튼 과 span 을 넣기
  toDoLi.appendChild(delBtn);
  toDoLi.appendChild(toDoSpan);
  //버튼과 span이 들어간 li를 ul인 toDoList 에 넣기
  toDoList.appendChild(toDoLi);
  toDoLi.id = newId;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);

  saveToDos();
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  //입력되면 ''으로 초기화 시켜주기  안하면 preventDefault 때문에 글이 남아있음
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //js가 이해하도록 다시 JSON을 이용해 obj로 parse해주는 것
    const parsedToDos = JSON.parse(loadedToDos);
    /*
forEach 구문에서 paintToDo를 하나씩 돌리면서
새로고침시 []로 초기화된 toDos에 하나씩 들어가며 id들도 새롭게 1~... 만들어진다.
즉, 새로고침을 하지 않은 상태에서 삭제하고 만들었을 때 숫자의 중복이나 공백이 생길 수는 있지만
새로고침을 하게 되면 forEach -> paintToDo 에서 새롭게 toDos를 재설정하면서 id 역시 1~...로 재설정이 된다.
*새로고침 전 id가 중복 되어도 event.target으로 삭제를 하기 때문에 다른 큰문제는 아직은 없어보인다.
*/

    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
      console.log(toDos);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDoSubmit);
}
init();
