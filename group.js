const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const groupSelect = document.getElementById("group");
                groupSelect.innerHTML = "";
                data.forEach(group => {
                    const option = document.createElement("option");
                    option.value = group.id; // Встановлення значення як ідентифікатор групи
                    option.textContent = `${group.name} - ${group.year}`; // Відображення групи
                    groupSelect.appendChild(option);
                });
            } else {
                console.error("Error:", xhr.status);
            }
        }
    };
    xhr.open("GET", "http://127.0.0.1:8000/api/groups/", true);
    xhr.send();


    function submitForm() {
        // Отримую обрану групу з випадаючого списку
        const selectedGroupId = document.getElementById('group').value;
        localStorage.setItem('selectedGroupId', selectedGroupId);
        // Додаю ідентифікатор групи до URL другої сторінки
        window.location.href = `page3.html?group=${selectedGroupId}`;

        // Повертаю false, щоб уникнути фактичного відправлення форми
        return false;
    }
