let r = document.getElementsByName("R");
let x = document.getElementsByName("X");
let y = document.getElementById("Y");
let table = document.getElementById("tbody");
let yString=JSON.stringify(y);

for (var i = 0; i < x.length; ++i) {
    var item = x[i];  // Вызов myNodeList.item(i) необязателен в JavaScript
}

function fieldsEmpty() {
    let isEmpty = false;
    if (!y.valueOf()) {
        $('#messageY').text("Это поле обязательно для заполнения");
        isEmpty = true;
    } else $('#messageY').text("");
    return isEmpty;
}

function isValuesValid() {
    let isOK = true
    if (r.valueOf() >= 4 || r.valueOf() <= 1 || isNaN(r.valueOf())){
        $('#messageR').text("Некорректный ввод");
        isOK = false;
    }

    if (!isNaN(parseFloat(x.valueOf())) && ![-5, -4, -3, -2, -1, 0, 1, 2, 3].includes(parseFloat(x.valueOf()))) {
        $('#messageX').text("Некорректный ввод");
        isOK = false;
    }
    if (y.valueOf() >= 3 || y.valueOf() <= -3 || isNaN(y.valueOf())){
        $('#messageY').text("Некорректный ввод");
        isOK = false;
    }
    return isOK;
}

$(document).ready(function () {
    $('[data-reset]').on('click', function (e) {
        e.preventDefault();
        console.log("here")
        $.ajax({
            url: "../PHP/reset.php",
            async: true,
            type: "GET",
            data: {},
            cache: false,
            success: function(response) {
                table.innerHTML = `
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Выполнение</th>
                    <th>Время</th>
                </tr>
                `
            },
            error: function(xhr) {

            }
        });
    })
})
console.log("Ya tut");
$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        //let isOkFields = !fieldsEmpty();
       // if (!isOkFields) return;
        console.log("Я в сабмите");
       // let isOkValues = isValuesValid();
        //if (isOkFields && isOkValues) {
            $.ajax({
                url: "../PHP/inputScript.php",
                async: true,
                type: "GET",
                data: {
                    "x": x.value,
                    "y": y.value,
                    "r": r.value
                },
                cache: false,
                success: function(response) {
                    let table = document.getElementById("tbody");
                    table.insertAdjacentHTML('beforeend', response);
                },
                error: function (jqXHR, exception) {
                    let msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested JSON parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    alert(msg);
                }
            });

    })
});

$(document).ready(function () {
    console.log("Я в ресторе");
    $.ajax({
        url: "../PHP/restore.php",
        async: true,
        type: "GET",
        success: function (response){
            let table = document.getElementById("tbody");
            table.insertAdjacentHTML('beforeend', response);
        }
    })
})