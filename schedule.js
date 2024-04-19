window.onload = function () {
    // Викликаю функцію для отримання розкладу при завантаженні сторінки
    fetchSchedule();
}
document.getElementById("day").addEventListener("change", fetchSchedule);

// Функція для завантаження розкладу з правильними параметрами
function fetchSchedule() {
    // Отримуємо id групи та обрану назву дня
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get("group");
    //const groupId = document.getElementById('group').value;
    const selectedDay = document.getElementById("day").value;
    const encodedDay = encodeURIComponent(selectedDay);

    console.log(groupId);
    console.log(selectedDay);

    // Перевіряємо, чи обрані значення не пусті
    if (!groupId || !selectedDay) {
        console.error("Error: Group ID or selected day is empty");
        return;
    }

    // Формуємо URL для запиту
    const url = `http://127.0.0.1:8000/schedule_display/?group=${groupId}&day_or_week=day&day=${encodedDay}`;


    // Виконуємо AJAX-запит
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const scheduleData = JSON.parse(xhr.responseText);
                renderSchedule(scheduleData); // Викликаємо функцію для відображення розкладу
                } else {
                    console.error("Error:", xhr.status);
                }
        }
    };


    xhr.open("GET", url, true);
    xhr.send();
}

function renderSchedule(scheduleData) {
    const scheduleList = document.querySelector(".schedule");

    // Очищаємо список розкладу перед додаванням нових даних
    scheduleList.innerHTML = "";

    // Проходимось по кожному елементу розкладу та додаємо його до списку
    scheduleData.forEach(item => {
        const listItem = document.createElement("li");
        listItem.classList.add("schedule-item");
        listItem.innerHTML = `
            <span class="time">&#9671; ${item.time}</span>
            <span class="subject">&#8608; ${item.subject_name}</span>
            <span class="teacher">&#8608; ${item.teacher_last_name} ${item.teacher_name}</span>
            <span class="location">&#8608; ${item.location}</span>
        `;
            scheduleList.appendChild(listItem);
    });
}

    function redirectToPage(selectElement) {
        var selectedValue = selectElement.value;
            if (selectedValue) {
                window.location.href = selectedValue;
            }
    }
