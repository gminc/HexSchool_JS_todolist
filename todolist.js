const txt = document.querySelector(".txt");
const save = document.querySelector(".save");
const list = document.querySelector(".list");
const complete = document.querySelector(".complete");
const filter = document.querySelector(".filter");
const deleteComplete = document.querySelector(".deleteComplete");

let data = [];
function renderData() {
    let str = "";
    const filterValue = document.querySelectorAll('.is-focus')[0].getAttribute('value')
    data.forEach(function (item, index) {
        switch (filterValue) {
            case '待完成':
                if (item.status === filterValue) {
                    str += `<li><input type="checkbox" class="check" data-num="${index}">${item.content}<button type="button" class="delete" data-num="${index}">X</li>`
                }
                break;
            case '已完成':
                if (item.status === filterValue) {
                    str += `<li><input type="checkbox" class="check" data-num="${index}" checked>${item.content}<button type="button" class="delete" data-num="${index}">X</li>`
                }
                break;
            default:
                str += `<li><input type="checkbox" class="check" data-num="${index}" ${item.status === "已完成" && 'checked'}>${item.content}<button type="button" class="delete" data-num="${index}">X</li>`
                break;
        }
    })
    if (str === '' && filterValue != '全部') {
        str = `尚無${filterValue}之事項`
    }
    list.innerHTML = str;
    complete.innerHTML = `${data.filter(function (item) { return item.status == "待完成" }).length} 個待完成項目`
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
}

save.addEventListener("click", function (e) {
    inputContent();
})

txt.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        inputContent();
    }
})

list.addEventListener("click", function (e) {
    let num = e.target.getAttribute("data-num");
    if (e.target.getAttribute("class") == "delete") {
        data.splice(num, 1);
    }
    else if (e.target.getAttribute("class") == "check") {
        console.log('target', e.target.checked)
        if (e.target.checked) {
            data[num].status = "已完成";
        } else {
            data[num].status = "待完成";
        }
    }
    else {
        return;
    }
    renderData();
})

filter.addEventListener("click", function (e) {
    for (const node of document.querySelectorAll('.filter input')) {
        node.classList.remove('is-focus')
    }
    e.target.classList.add('is-focus')
    if (e.target.value == "undefinded") {
        return;
    }
    renderData();
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
