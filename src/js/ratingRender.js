const convertResultToDom = (result) => {
  if (result == null) {
    return '-';
  }
  
  const { time, tries, wordSize, win} = result;

  return (
    `<ul class="result-data">
      <li class="result-item">
        <h5 class="title">Дата:</h5>
        <div class="value">${new Date(time).toLocaleDateString()}</div>
      </li>
      <li class="result-item">
        <h5 class="title">Спроб використано:</h5>
        <div class="value">${tries}</div>
      </li>
      <li class="result-item">
        <h5 class="title">Розмір слова:</h5>
        <div class="value">${wordSize}</div>
      </li>
      <li class="result-item">
        <h5 class="title">Перемога:</h5>
        <div class="value">${win? 'так': 'ні'}</div>
      </li>
    </ul> `
  );
};

const ratingRender = (results)=> {
  const totalGames = results.length;
  const totalWins = Math.round((results.filter((res) => res.win).length / totalGames ) * 100);
  const bestResult = Math.min.apply(null, results.map((res) => res.tries));
  const worseResult = Math.max.apply(null, results.map((res) => res.tries));

  let resultToday = '-';
  let resultYesterday = '-';
  let result2DaysAgo = '-';
  let result3DaysAgo = '-';
  let result4DaysAgo = '-';
  let result5DaysAgo = '-';
  let result6DaysAgo = '-';

  switch(totalGames) {
    case 1:
      resultToday = convertResultToDom(results[totalGames - 1]);
      resultYesterday = '-';
      result2DaysAgo = '-';
      result3DaysAgo = '-';
      result4DaysAgo = '-';
      result5DaysAgo = '-';
      result6DaysAgo = '-';
      break;
    case 2:
      resultToday = convertResultToDom(results[totalGames - 1]);
      resultYesterday = convertResultToDom(results[totalGames - 2]);
      result2DaysAgo = '-';
      result3DaysAgo = '-';
      result4DaysAgo = '-';
      result5DaysAgo = '-';
      result6DaysAgo = '-';
      break;
    case 3:
      resultToday = convertResultToDom(results[totalGames - 1]);
      resultYesterday = convertResultToDom(results[totalGames - 2]);
      result2DaysAgo = convertResultToDom(results[totalGames - 3]);
      result3DaysAgo = '-';
      result4DaysAgo = '-';
      result5DaysAgo = '-';
      result6DaysAgo = '-';
      break;
    case 4:
      resultToday = convertResultToDom(results[totalGames - 1]);
      resultYesterday = convertResultToDom(results[totalGames - 2]);
      result2DaysAgo = convertResultToDom(results[totalGames - 3]);
      result3DaysAgo = convertResultToDom(results[totalGames - 4]);
      result4DaysAgo = '-';
      result5DaysAgo = '-';
      result6DaysAgo = '-';
      break;
    case 5:
      resultToday = convertResultToDom(results[totalGames - 1]);
      resultYesterday = convertResultToDom(results[totalGames - 2]);
      result2DaysAgo = convertResultToDom(results[totalGames - 3]);
      result3DaysAgo = convertResultToDom(results[totalGames - 4]);
      result4DaysAgo = convertResultToDom(results[totalGames - 5]);
      result5DaysAgo = '-';
      result6DaysAgo = '-';
      break;
    case 6:
      resultToday = convertResultToDom(results[totalGames - 1]);
      resultYesterday = convertResultToDom(results[totalGames - 2]);
      result2DaysAgo = convertResultToDom(results[totalGames - 3]);
      result3DaysAgo = convertResultToDom(results[totalGames - 4]);
      result4DaysAgo = convertResultToDom(results[totalGames - 5]);
      result5DaysAgo = convertResultToDom(results[totalGames - 6]);
      result6DaysAgo = '-';
      break;
    case 7:
      resultToday = convertResultToDom(results[totalGames - 1]);
      resultYesterday = convertResultToDom(results[totalGames - 2]);
      result2DaysAgo = convertResultToDom(results[totalGames - 3]);
      result3DaysAgo = convertResultToDom(results[totalGames - 4]);
      result4DaysAgo = convertResultToDom(results[totalGames - 5]);
      result5DaysAgo = convertResultToDom(results[totalGames - 6]);
      result6DaysAgo = convertResultToDom(results[totalGames - 7]);
      break;
  }
  
  return (
  `
  <div class="rating-window">
    <h2 class="title">СТАТИСТИКА</h2>
    <h3 class="sub-title">ЗАГАЛЬНА</h3>
    <ul class="total-statistics-list">
      <li class="statistic-item">
        <div class="value">${totalGames}</div>
        <h5 class="title">Проведено ігр</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${totalWins}</div>
        <h5 class="title">% перемог</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${bestResult}</div>
        <h5 class="title">Найкращий результат</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${worseResult}</div>
        <h5 class="title">Найгірший результат</h5>
      </li>
    </ul>
    <hr>
    <h3 class="sub-title">ПО ДНЯХ</h3>
    <ul class="by-day-statistics-list">
      <li class="statistic-item">
        <div class="value">${resultToday}</div>
        <h5 class="title">Сьогодні</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${resultYesterday}</div>
        <h5 class="title">Вчора</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${result2DaysAgo}</div>
        <h5 class="title">2 дні назад</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${result3DaysAgo}</div>
        <h5 class="title">3 дні назад</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${result4DaysAgo}</div>
        <h5 class="title">4 дні назад</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${result5DaysAgo}</div>
        <h5 class="title">5 днів назад</h5>
      </li>
      <li class="statistic-item">
        <div class="value">${result6DaysAgo}</div>
        <h5 class="title">6 днів назад</h5>
      </li>
    </ul>
    <hr>
  </div>
</div>`
);};

export default ratingRender;
