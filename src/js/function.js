plus_list = document.getElementsByClassName("plus");
minus_list = document.getElementsByClassName("minus");
let back_tag = null;
let bullet_list;

function update_Probability() {
    for (let i = 0; i < bullet_list.length; i++) {
        if (tbn + fbn === tn + fn){
                back_tag.innerHTML = ""
                break
        }else if (bullet_list[i].dataset.value === "null") {
            if (back_tag !== null) {
                back_tag.innerHTML = ""
            }
            bullet_list[i].innerHTML = "<p>" + ((tn - tbn) / ((tn + fn) - (tbn + fbn)) * 100).toFixed(0) + "%</p>"
            back_tag = bullet_list[i]
            break
        }
    }
}

setTimeout(function () {
    bullet_list = document.querySelectorAll('.bullet:not(.ban_bullet)')
    tn = parseInt(document.getElementById("true").innerText);
    fn = parseInt(document.getElementById("false").innerText);
    for (let i = 0; i < bullet_list.length; i++) {
        bullet_list[i].addEventListener("click", ntf);
    }
    update_Probability()
}, 100)

// Increase bullets, 增加子弹
function plus(event) {
    let value = event.srcElement.dataset.value
    if (tn === -1) {
        tn = parseInt(document.getElementById("true").innerText);
        fn = parseInt(document.getElementById("false").innerText);
    }
    if (value === "true" && fn > 0) {
        fn -= 1;
        tn += 1;
    } else if (value === "false" && tn > 0) {
        fn += 1;
        tn -= 1;
    } else {
        return
    }
    document.getElementById("true").innerText = tn;
    document.getElementById("false").innerText = fn;
    update_Probability()
}


// Reduce bullets, 减少子弹
function minus(event) {
    let value = event.srcElement.dataset.value
    if (value === "true" && tn > 0) {
        fn += 1;
        tn -= 1;
    } else if (value === "false" && fn > 0) {
        fn -= 1;
        tn += 1;
    } else {
        return
    }
    document.getElementById("true").innerText = tn;
    document.getElementById("false").innerText = fn;
    update_Probability()
}

function ntf(event) {
    let value = event.srcElement.dataset.value
    if (value === "null" && tbn < tn) {
        event.srcElement.dataset.value = "true"
        tbn += 1
    } else if (value === "true" && fbn < fn) {
        event.srcElement.dataset.value = "false"
        fbn += 1
        tbn -= 1
    } else if (value === "null" && fbn < fn) {
        event.srcElement.dataset.value = "false"
        fbn += 1
    } else if (value === "false") {
        event.srcElement.dataset.value = "null"
        fbn -= 1
    } else {
        event.srcElement.dataset.value = "null"
        tbn -= 1
    }
    update_Probability()
}


// Adding a click event, 增加点击事件
for (let i = 0; i < 2; i++) {
    minus_list[i].addEventListener("click", minus);
    plus_list[i].addEventListener("click", plus);
}





