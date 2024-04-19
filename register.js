document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#registration-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Зупиняємо стандартну поведінку форми

        // Отримуємо дані з форми
        var firstName = document.querySelector("#name").value;
        var lastName = document.querySelector("#surname").value;

        // Відправляємо дані на сервер за допомогою AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8000/register_teacher/", true); // URL для обробки реєстрації викладача на сервері
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                window.location.href = "/html/page_5.html"; // Перенаправлення на сторінку успішної реєстрації
            } else {
                // Відобразити помилку
                console.error(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify({
            first_name: firstName,
            last_name: lastName
        }));
    });
});
