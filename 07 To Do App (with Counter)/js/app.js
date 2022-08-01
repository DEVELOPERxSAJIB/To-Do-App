// get elements
let todo_form = document.getElementById('todo_form');
let todo_name = document.getElementById('todo_name');
let todo_client = document.getElementById('todo_client');
let todo_date = document.getElementById('todo_date');
let todo_time = document.getElementById('todo_time');
let list_group = document.querySelector('.list-group');


// submit To Do Form
todo_form.onsubmit = (e) => {
    e.preventDefault();

    let day_one = new Date(todo_date.value + ' ' + todo_time.value);
    let day_two = new Date();

    let storageVal = localStorage.getItem('todoapps');
    let doArray;

    if(storageVal == null) {
        doArray = [];
    } else {
        doArray = JSON.parse(storageVal);
    }

    doArray.push({
        name : todo_name.value,
        client : todo_client.value,
        remain : (day_one.getTime() - day_two.getTime()),
        dead_line : day_one.getTime()
    });

    localStorage.setItem('todoapps', JSON.stringify(doArray));
    todo_form.reset();
    showList();

}


// Auto Load ShowList
setInterval(() => {
    showList();
}, 1000);


// Show List
showList();
function showList(){
    let day = new Date();
    let storageVal = localStorage.getItem('todoapps');
    let doArray
    let data = '';

    if(localStorage == null) {
        doArray = [];
    } else {
        doArray = JSON.parse(storageVal);
    }

    doArray.map((val, index) => {
        data += `<li class="list-group-item shadow">
            ${val.name} | ${val.client} | Remain Time : <strong>[ ${remainTime(val.dead_line, day.getTime())} ]</strong>
            <button onclick="deleteList(${index})" class="close">&times</button>
            <span style="${rangeBar(val.remain, val.dead_line)}" class="status"></span>
        </li>`
    });

    list_group.innerHTML = data;

}

function rangeBar(remain, dead_line){
    let day = new Date();
    let current_remain =  dead_line - day.getTime();
    
    let remainPer = (100*current_remain) / remain;
  
    let width =  Math.floor(remainPer);
  
    if( width <= 0 ){
      width = `width:100%; background-color:red;`;
    }else if(width >= 0 && width <= 30){
      width = `width:${width}%; background-color:pink;`;
    }else if(width >= 30 && width <= 40){
      width = `width:${width}%; background-color:orange;`;
    }else if(width >= 41 && width <= 70){
      width = `width:${width}%; background-color:blue;`;
    }else if(width >= 71 && width <= 100){
      width = `width:${width}%; background-color:green;`;
    }
  
    return width;
  
  }


// Remain Date
function remainTime(dead_line, current_time){
    let total_sec = Math.floor((dead_line - current_time) / 1000);
    let total_min = Math.floor(total_sec / 60);
    let total_hours = Math.floor(total_min / 60);
    let total_days = Math.floor(total_hours / 24);

    let hours = total_hours - (total_days * 24);
    let min = total_min - (total_days * 24 * 60) - (hours * 60);
    let sec = total_sec - (total_days * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60);

    if(dead_line > current_time) {
        return `${total_days} days ${hours} hours ${min} mins ${sec} sec`;
    } else {
        return `<strong style="color:red;">Time over</strong>`;
    }
}


// Delete To Do List
function deleteList(index){
    let storageVal = localStorage.getItem('todoapps');
    let doArray;

    if (storageVal == null){
        doArray = [];
    } else {
        doArray = JSON.parse(storageVal);
    }

    doArray.splice(index, 1);
    localStorage.setItem('todoapps', JSON.stringify(doArray));
    showList();
}
