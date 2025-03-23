const modal = document.getElementById("modal");
const modalTeacher = document.getElementById("modalTeacher");
const closeButtons = document.querySelectorAll(".close");

// Функція для закриття модальних вікон
function closeModals() {
    modal.style.display = "none";
    modalTeacher.style.display = "none";
}

// Відкриття модального вікна для додавання вчителя
document.querySelectorAll(".modal-toggle").forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = "block";
        modalTeacher.style.display = "none";
    });
});

// Відкриття модального вікна для перегляду інформації про вчителя
document.querySelectorAll(".modal-teacher-toggle").forEach(btn => {
    btn.addEventListener('click', () => {
        modalTeacher.style.display = "block";
        modal.style.display = "none";
    });
});

// Закриття модальних вікон при кліку на кнопки закриття
closeButtons.forEach(button => {
    button.addEventListener('click', closeModals);
});

// Закриття модальних вікон при кліку поза ними
window.addEventListener('click', (event) => {
    if (event.target == modal || event.target == modalTeacher) {
        closeModals();
    }
});