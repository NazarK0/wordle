const n=(n,t)=>`\n  <h2 class="title">ЯК ГРАТИ</h2>\n  <p>Відгадайте <strong>СЛОВЕЧКО</strong> за ${n} спроб.</p>\n  <p>\n    Кожне припущення має бути дійсним словом із ${t} букв. \n    Натисніть кнопку Enter, щоб надіслати.\n  </p>\n  <p>\n    Після кожної здогадки колір плиток буде змінюватися, щоб показати, \n    наскільки ваша здогадка була близька до слова.\n  </p>\n  <hr>\n  <h4>Приклад</h4>\n  <div class="matrix-row">\n    <div class="letter not-in-word">Л</div>\n    <div class="letter not-in-word">И</div>\n    <div class="letter wrong-place">С</div>\n    <div class="letter not-in-word">Т</div>\n    <div class="letter not-in-word">О</div>\n    <div class="letter right-place">П</div>\n    <div class="letter not-in-word">А</div>\n    <div class="letter wrong-place">Д</div>\n  </div>\n  <p>\n    Буква <strong>П</strong> міститься у слові і на правильному місці.\n  </p>\n  <p>\n    Букви <strong>С, Д</strong> містяться у слові, але не на правильному місці.\n  </p>\n  <p>\n    Букви <strong>Л, И, Т, О, А</strong> відсутні у слові.\n  </p>\n  <hr>\n  <p>\n    <strong>Нове СЛОВЕЧКО буде доступним щодня!</strong>\n  </p>\n</div>`;export default n;