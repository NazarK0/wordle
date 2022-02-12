const helpRender = (tries, wordSize)=> (
  `
  <h2>ЯК ГРАТИ</h2>
  <p>Відгадайте <strong>СЛОВЕЧКО</strong> за ${tries} спроб.</p>
  <p>
    Кожне припущення має бути дійсним словом із ${wordSize} букв. 
    Натисніть кнопку Enter, щоб надіслати.
  </p>
  <p>
    Після кожної здогадки колір плиток буде змінюватися, щоб показати, 
    наскільки ваша здогадка була близька до слова.
  </p>
  <hr>
  <h4>Приклад</h4>
  <div class="matrix-row">
    <div class="letter not-in-word">Л</div>
    <div class="letter not-in-word">И</div>
    <div class="letter wrong-place">С</div>
    <div class="letter not-in-word">Т</div>
    <div class="letter not-in-word">О</div>
    <div class="letter right-place">П</div>
    <div class="letter not-in-word">А</div>
    <div class="letter wrong-place">Д</div>
  </div>
  <p>
    Буква <strong>П</strong> міститься у слові і на правильному місці.
  </p>
  <p>
    Букви <strong>С, Д</strong> містяться у слові, але не на правильному місці.
  </p>
  <p>
    Букви <strong>Л, И, Т, О, А</strong> відсутні у слові.
  </p>
  <hr>
  <p>
    <strong>Нове СЛОВЕЧКО буде доступним щодня!</strong>
  </p>
</div>`
);

export default helpRender;
