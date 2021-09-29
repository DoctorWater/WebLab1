let rIn = document.getElementsByName("R[]");
let xIn = document.getElementsByName("X[]");
let y = document.getElementById("Y");
let table = document.getElementById("tbody");
let x=-99;
let r=-99;
console.log(xIn.length);
console.log(xIn);


$(document).ready(function () {
    $('[data-reset]').on('click', function (e) {
        e.preventDefault();
        console.log("here")
        $.ajax({
            url: "reset.php",
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
$(document).ready(function() {
    $('[data-submit]').on('click', function(e) {
        for (let i = 0; i < xIn.length; i++) {
            if (xIn[i].checked === true) {
                x = xIn[i].value;
            }
        }
        if (x==-99){
            alert("Некорректный ввод");
            return;
        }
        for (let i = 0; i < rIn.length; i++) {
            if (rIn[i].checked === true) {
                r = rIn[i].value;
            }
        }
        if (r==-99)
        {
            alert("Некорректный ввод");
            return;
        }
        if(!isValuesValid())
            return;
            $.ajax({
                url: "inputScript.php",
                async: true,
                type: "GET",
                data: {
                    "x": x,
                    "y": y.value,
                    "r": r
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
        url: "restore.php",
        async: true,
        type: "GET",
        success: function (response){
            let table = document.getElementById("tbody");
            table.insertAdjacentHTML('beforeend', response);
        }
    })
})

function isValuesValid() {
    let isOK = true;
    if (y.value >= 5 || y.value <= -5 || isNaN(y.value)||y.value==null){
        alert("Некорректный ввод");
        isOK = false;
    } else {
        y.style.borderBottom = "1px solid #ACACAC";
    }
    return isOK;
}