const txt = document.querySelector(".txt");
const save = document.querySelector(".save");
const list = document.querySelector(".list");
const complete = document.querySelector(".complete");
const filter = document.querySelector(".filter");
const deleteComplete = document.querySelector(".deleteComplete");

let data = [];

function renderData() {
    let str = "";
    data.forEach(function(item, index) {
        if (item.status == "待完成") {
            str += `<li><input type="checkbox" class="check" data-num="${index}" >${item.content}<input type="button" class="delete" data-num="${index}" value="X"></li>`
            list.innerHTML = str;
        } else if (item.status == "已完成"){
            str += `<li><input type="checkbox" class="check" data-num="${index}" checked>${item.content}<input type="button" class="delete" data-num="${index}" value="X"></li>`
            list.innerHTML = str;
        }
    })
}

function incompleteList() {
    complete.innerHTML = `${data.filter(function(item) { return item.status == "待完成" }).length} 個待完成項目`
}

function inputContent() {
    if (txt.value == "") {
        alert("請輸入內容");
        return;
    }
    data.push({
        content: txt.value,
        status: "待完成",
    });
    txt.value = "";
    renderData();
    incompleteList();
}

save.addEventListener("click", function(e) {
    inputContent();
})

txt.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        inputContent();
    }
})

list.addEventListener("click", function(e) {
    let num = e.target.getAttribute("data-num");
    if (e.target.getAttribute("class") == "delete") {
        data.splice(num, 1);
        renderData();
    }
    else if (e.target.getAttribute("class") == "check") {
        console.log('target', e.target.checked)
        if (e.target.checked) {
            data[num].status = "已完成";
        } else{
            data[num].status = "待完成";
        }
        incompleteList();
    }
    else {
        return;
    }
})

filter.addEventListener("click", function(e) {
    if (e.target.value == "undefinded") {
        return;
    }
    else if (e.target.value == "全部") {
        renderData();
    }
    else if (e.target.value == "待完成") {
        let str = "";
        data.forEach(function(item, index) {
            if (item.status == "待完成") {
                str += `<li><input type="checkbox" class="check" data-num="${index}" >${item.content}<input type="button" class="delete" data-num="${index}" value="X"></li>`
                list.innerHTML = str;
            } else if (data.filter(function(item) { return item.status == "待完成" }).length == 0) {
                str = "尚無已完成之事項";
                list.innerHTML = str;
            } else {
                return;
            }
        })
    }
    else if (e.target.value == "已完成") {
        let str = "";
        data.forEach(function(item, index) {
            if (item.status == "已完成") {
                str += `<li><input type="checkbox" class="check" data-num="${index}" checked>${item.content}<input type="button" class="delete" data-num="${index}" value="X"></li>`
                list.innerHTML = str;
            } else if (data.filter(function(item) { return item.status == "已完成" }).length == 0) {
                str = "尚無已完成之事項";
                list.innerHTML = str;
            } else {
                return;
            }
        })        
    }
})

deleteComplete.addEventListener("click", function(e) {
    if (e.target.value == "undefinded") {
        return;
    } 
    else if (e.target.value == "清除已完成項目") {
        data = data.filter(function(item) { return item.status == "待完成" })
        };
    renderData();
})