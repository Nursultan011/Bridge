let currentLanguage;
let details;

function setLanguage(lang) {
  currentLanguage = lang.toUpperCase();
  sessionStorage.setItem('selectedLang', lang.toUpperCase()); // Записываем выбранный язык в sessionStorage
  loadProgramData();
}

function updateDOMWithDetails() {
  const mainProgramsTitle = document.querySelector('.main-programs-title');
  const mainProgramsDescription = document.querySelector('.main-programs-subtitle');
  const chooseDate = document.querySelector('.choose-date');
  const chooseHall = document.querySelector('.choose-hall');
  const chooseHallMob = document.querySelector('.choose-hall-mob');

  chooseDate.textContent = details.choose_data;
  chooseHall.textContent = details.choose_hall;
  chooseHallMob.textContent = details.choose_hall;
  mainProgramsTitle.textContent = details.main_title; // Предполагая, что у вас есть свойство title в details
  mainProgramsDescription.textContent = details.main_subtitle; // Предполагая, что у вас есть свойство description в details
}

function loadProgramData() {
  let ruImages = {};

  // 1. Загрузить данные из programs_RU.json для изображений
  fetch('jsons/programs_RU.json')
    .then(response => response.json())
    .then(ruData => {
      ruData.programs.forEach((program, programIndex) => {
        if (program.events) {
          program.events.forEach((event, eventIndex) => {
            if (event.moderators) {
              event.moderators.forEach((moderator, moderatorIndex) => {
                const key = `${programIndex}-${eventIndex}-moderator-${moderatorIndex}`;
                ruImages[key] = moderator.img;
              });
            }
            if (event.speakers) {
              event.speakers.forEach((speaker, speakerIndex) => {
                const key = `${programIndex}-${eventIndex}-speaker-${speakerIndex}`;
                ruImages[key] = speaker.img;
              });
            }
            if (event.presenters) {
              event.presenters.forEach((presenter, presenterIndex) => {
                const key = `${programIndex}-${eventIndex}-presenter-${presenterIndex}`;
                ruImages[key] = presenter.img;
              });
            }
            if (event.jury) {
              event.jury.forEach((juryMember, juryIndex) => {
                const key = `${programIndex}-${eventIndex}-jury-${juryIndex}`;
                ruImages[key] = juryMember.img;
              });
            }
          });
        }
      });

      // Запустить второй fetch запрос после завершения первого
      return fetch(`jsons/programs_${currentLanguage}.json`);
    })
    .then(response => response.json())
    .then(data => {
      data = JSON.parse(JSON.stringify(data));
      console.log();
      data.programs.forEach((program, programIndex) => {
        if (program.events) {
          program.events.forEach((event, eventIndex) => {
            if (event.moderators) {
              event.moderators.forEach((moderator, moderatorIndex) => {
                const key = `${programIndex}-${eventIndex}-moderator-${moderatorIndex}`;
                if (ruImages[key]) {

                  moderator.img = ruImages[key];
                }
              });
            }
            if (event.speakers) {
              event.speakers.forEach((speaker, speakerIndex) => {
                const key = `${programIndex}-${eventIndex}-speaker-${speakerIndex}`;
                if (ruImages[key]) {
                  speaker.img = ruImages[key];
                }
              });
            }
            if (event.presenters) {
              event.presenters.forEach((presenter, presenterIndex) => {
                const key = `${programIndex}-${eventIndex}-presenter-${presenterIndex}`;
                if (ruImages[key]) {
                  presenter.img = ruImages[key];
                }
              });
            }
            if (event.jury) {
              event.jury.forEach((juryMember, juryIndex) => {
                const key = `${programIndex}-${eventIndex}-jury-${juryIndex}`;
                if (ruImages[key]) {
                  juryMember.img = ruImages[key];
                }
              });
            }
          });
        }
      });

      cardsData = data.programs;
      details = data.details;
      renderCards(cardsData);
      populateHalls(cardsData);
      updateDOMWithDetails();
      updateSelectedDateText();
      updateDropdownText();
    })
    .catch(error => {
      console.error('Ошибка загрузки данных:', error);
    });
}



// При загрузке страницы:
document.addEventListener("DOMContentLoaded", () => {
  let sessionLang = sessionStorage.getItem('selectedLang');

  // Если в sessionStorage есть значение языка, используем его, иначе по умолчанию 'ru'
  if (sessionLang) {
    setLanguage(sessionLang);
  } else {
    setLanguage('ru');
  }
});

let cardsData = [];

const dateFilterDiv = document.getElementById('dateFilter');
const dateFilterDivs = document.querySelectorAll('#dateFilter .date-option');
const hallTabs = document.getElementById('hallTabs');
const cardsDiv = document.getElementById('program-cards');

let currentHallFilter = '';

document.querySelector('.selected-date').addEventListener('click', toggleDateDropdown);
dateFilterDivs.forEach(div => div.addEventListener('click', selectDate));

function populateHalls(cards) {
  hallTabs.innerHTML = '';

  const orderedHalls = [];
  cards.forEach(card => {
    card.events.forEach(event => {
      if (!orderedHalls.includes(event.hall)) {
        orderedHalls.push(event.hall);
      }
    });
  });

  const allHallsBtn = document.createElement('button');
  allHallsBtn.textContent = details.all_halls;
  allHallsBtn.setAttribute('data-hall', '');
  allHallsBtn.classList.add('selected');
  hallTabs.appendChild(allHallsBtn);

  orderedHalls.forEach(hall => {
    const hallBtn = document.createElement('button');
    hallBtn.textContent = hall;
    hallBtn.setAttribute('data-hall', hall);
    hallTabs.appendChild(hallBtn);
  });
}


function toggleDateDropdown() {
  dateFilterDiv.classList.toggle('open');
  console.log("Toggled! Current classes:", dateFilterDiv.className);
}

function formatDateForDisplay(date) {
  if (date === '2023-10-12') {
    return `12 ${details.octobers}`;
  } else if (date === '2023-10-13') {
    return `13 ${details.octobers}`;
  } else if (date === 'both') {
    return `12-13 ${details.octobers}`;
  } else {
    // Дополнительный код для преобразования других дат (если необходимо)
    return date;
  }
}

function selectDate(event) {
  const dateDiv = event.currentTarget;

  // Если дата уже выбрана, снимаем выбор
  if (dateDiv.classList.contains('selected')) {
    dateDiv.classList.remove('selected');

  } else {
    // Снимаем выбор со всех дат
    dateFilterDivs.forEach(div => div.classList.remove('selected'));

    // Выбираем текущую дату
    dateDiv.classList.add('selected');
  }

  updateSelectedDateText();

  toggleDateDropdown();

  filterCards();
}

function updateDropdownText() {
  const dateOptions = document.querySelectorAll('.date-option');
  dateOptions.forEach(option => {
    const date = option.getAttribute('data-date');
    const checkmark = option.querySelector('.checkmark');
    const originalText = option.textContent.replace(checkmark.textContent, '').trim();
    const updatedText = formatDateForDisplay(date);

    if (originalText !== updatedText) {
      option.textContent = updatedText;
      option.appendChild(checkmark); // снова добавим checkmark в конец элемента date-option
    }

  });
}

function updateSelectedDateText() {
  console.log("Updating selected date text. October:", details.octobers);

  const selectedDates = Array.from(document.querySelectorAll('#dateFilter .date-option.selected'));
  const selectedDateDiv = document.querySelector('.selected-date');

  if (selectedDates.length === 1 && selectedDates[0].getAttribute('data-date') === 'both') {
    selectedDateDiv.textContent = `12-13 ${details.octobers}`;
  } else if (selectedDates.length > 0) {
    const datesText = selectedDates.map(div => {
      const date = div.getAttribute('data-date');
      return formatDateForDisplay(date);
    });
    selectedDateDiv.textContent = datesText.join(', ');
  } else {
    selectedDateDiv.textContent = details.choose_date;
  }
}


hallTabs.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const allButtons = hallTabs.querySelectorAll('button');
    allButtons.forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');

    currentHallFilter = event.target.getAttribute('data-hall');

    filterCards(currentHallFilter);
  }
});


function filterCards(hallFilter = currentHallFilter) {
  const selectedDateDiv = document.querySelector('#dateFilter .date-option.selected');
  const selectedDate = selectedDateDiv ? selectedDateDiv.getAttribute('data-date') : null;

  let filteredCards;

  if (selectedDate === 'both') {
    filteredCards = [...cardsData]; // Покажем все карточки без фильтрации
  } else if (selectedDate) {
    filteredCards = cardsData.filter(card => card.date === selectedDate);
  } else {
    filteredCards = [...cardsData];
  }

  if (hallFilter) {
    filteredCards = filteredCards.map(card => {
      return {
        date: card.date,
        events: card.events.filter(event => event.hall === hallFilter)
      }
    }).filter(card => card.events.length > 0);
  }

  renderCards(filteredCards);
}


function formatDateText(date) {
  if (date === '2023-10-12') {
    return `12 ${details.octobers} — ${details.first_date_title}`;
  } else if (date === '2023-10-13') {
    return `13 ${details.octobers} — ${details.second_date_title}`;
  } else {
    return date;
  }
}

function generateModeratorsHTML(moderators) {
  let moderatorsHTML = `<div class="moderators"><h3>${details.moderator_title}</h3>`;
  moderators.forEach(moderator => {
    moderatorsHTML += `
      <div class="person">
        <img src="${moderator.img}" alt="${moderator.fio}">
        <div>
          <div class="person-name">${moderator.fio}</div>
          <div class="person-job">${moderator.job}</div>
        </div>
      </div>
    `;
  });
  moderatorsHTML += '</div>';
  return moderatorsHTML;
}

function generateSpeakersHTML(speakers) {
  let speakersHTML = `<div class="speakers"><h3>${details.speakers_title}</h3>`;
  speakers.forEach(speaker => {
    speakersHTML += `
      <div class="person">
        <img src="${speaker.img}" alt="${speaker.fio}">
        <div>
          <div class="person-name">${speaker.fio}</div>
          <div class="person-job">${speaker.job}</div>
        </div>
      </div>
    `;
  });
  speakersHTML += '</div>';
  return speakersHTML;
}

function generatePresentersHTML(speakers) {
  let speakersHTML = `<div class="speakers"><h3>${details.presenters_title}</h3>`;
  speakers.forEach(speaker => {
    speakersHTML += `
      <div class="person">
        <img src="${speaker.img}" alt="${speaker.fio}">
        <div>
          <div class="person-name">${speaker.fio}</div>
          <div class="person-job">${speaker.job}</div>
        </div>
      </div>
    `;
  });
  speakersHTML += '</div>';
  return speakersHTML;
}

function generateJuryHTML(jury) {
  let juryHTML = `<div class="speakers"><h3>${details.jury_title}</h3>`;
  jury.forEach(item => {
    juryHTML += `
      <div class="person">
        <img src="${item.img}" alt="${item.fio}">
        <div>
          <div class="person-name">${item.fio}</div>
          <div class="person-job">${item.job}</div>
        </div>
      </div>
    `;
  });
  juryHTML += '</div>';
  return juryHTML;
}

let addedTimes = [];

const hallsOrder = ["SKYNET", "TRON", "VISION", "JARVIS", "FRIDAY"];

function renderCards(cards) {
  cardsDiv.innerHTML = '';

  function sortByTime(a, b) {
    if (!a.time || !b.time) {
      return 0;
    }
    const [startA, endA] = a.time.split(" — ").map(time => time.split(":").map(Number).reduce((acc, val, idx) => acc + val * (idx === 0 ? 60 : 1)));
    const [startB, endB] = b.time.split(" — ").map(time => time.split(":").map(Number).reduce((acc, val, idx) => acc + val * (idx === 0 ? 60 : 1)));

    return startA - startB || endA - endB;
  }

  const sortByHallAndTime = (a, b) => {
    const hallOrderA = hallsOrder.indexOf(a.hall);
    const hallOrderB = hallsOrder.indexOf(b.hall);

    console.log("Comparing halls:", a.hall, b.hall, "Order A:", hallOrderA, "Order B:", hallOrderB, "Result:", hallOrderA - hallOrderB);

    if (hallOrderA !== hallOrderB) {
      return hallOrderA - hallOrderB;
    }

    const timeComparisonResult = sortByTime(a, b);
    console.log("Same halls, comparing times:", a.time, b.time, "Result:", timeComparisonResult);
    return timeComparisonResult;
  };


  function splitEventToHourlyBlocks(event) {
    const [start, end] = event.time.split(" — ").map(time => parseInt(time.split(":")[0], 10));

    let timeBlocks = [];

    for (let hour = start; hour < end; hour++) {
      let newEvent = { ...event };
      newEvent.originalTime = event.time; // сохраняем исходное время
      newEvent.time = `${String(hour).padStart(2, '0')}:00 — ${String(hour + 1).padStart(2, '0')}:00`;
      timeBlocks.push(newEvent);
    }

    return timeBlocks;
  }

  function groupEventsByHour(events) {
    let hourlyGroups = {};

    events.forEach(event => {
      let blocks = splitEventToHourlyBlocks(event);
      blocks.forEach(block => {
        if (!hourlyGroups[block.time]) {
          hourlyGroups[block.time] = [];
        }
        hourlyGroups[block.time].push(block);
      });
    });

    return hourlyGroups;
  }

  function isDurationMoreThanAnHour(time) {
    const [startHour, endHour] = time.split(" — ").map(t => parseInt(t.split(":")[0], 10));
    return endHour - startHour > 1;
  }

  const hallTabsElement = document.querySelector('#hallTabs');
  const selectedButton = hallTabsElement ? hallTabsElement.querySelector('.selected') : null;
  const allTabs = hallTabsElement ? hallTabsElement.children : [];
  const isAllHallsTabActive = allTabs.length > 0 && allTabs[0] === selectedButton;

  cards.forEach(card => {
    // Проверка наличия событий для текущей даты
    if (card.events.length > 0) {
      console.log("Processing date:", card.date);
      const dateHeader = document.createElement('h2');
      dateHeader.textContent = formatDateText(card.date);  // Используем нашу новую функцию здесь

      cardsDiv.appendChild(dateHeader);

      if (card.date === '2023-10-12' && isAllHallsTabActive) {
        const staticBlock = document.createElement('div');
        staticBlock.classList.add('static-block');
        staticBlock.innerHTML = `
        <div class="program-static">
          <div class="program-static-time">
            08:00 — 09:00
          </div>
          <div class="program-static-card">
            ${details.first_static_block}
          </div>
        </div>
        <div class="program-static">
          <div class="program-static-time">
            10:00 — 13:00
          </div>
          <div class="program-static-card">
            ${details.second_static_block}
          </div>
        </div>
      `;
        cardsDiv.appendChild(staticBlock);
      }

      programCardsWrap = document.createElement('div');
      programCardsWrap.classList.add('program-cards-wrap');
      cardsDiv.appendChild(programCardsWrap);

      if (!isAllHallsTabActive) {
        card.events.forEach(event => {
          console.log(isAllHallsTabActive, 'dewdwedew')
          if (isAllHallsTabActive && !programCardsWrap.querySelector(`.time-header[data-time="${event.time}"]`)) {
            const timeHeader = document.createElement('h3');
            timeHeader.classList.add('time-header');
            timeHeader.setAttribute('data-time', event.time);
            timeHeader.textContent = event.time;
            programCardsWrap.appendChild(timeHeader);
          }

          const cardDiv = document.createElement('div');
          cardDiv.classList.add('program-card');

          let contentHTML = '';

          if (event.moderators && event.moderators.length > 0) {
            contentHTML += generateModeratorsHTML(event.moderators);
          }

          if (event.speakers && event.speakers.length > 0) {
            contentHTML += generateSpeakersHTML(event.speakers);
          }

          if (event.presenters && event.presenters.length > 0) {
            contentHTML += generatePresentersHTML(event.presenters)
          }

          if (event.jury && event.jury.length > 0) {
            contentHTML += generateJuryHTML(event.jury)
          }

          const timeHTML = (!isAllHallsTabActive || isDurationMoreThanAnHour(event.time)) ? `<div>${event.time}</div>` : '';

          const descriptionHtml = ((event.title == 'Meet the drapers') ? `<p class="program-card-desc">${event.description}</p>` : '');

          cardDiv.innerHTML = `
            <div class="program-card-header">
              <div>${event.hall ?? ''}</div>
              ${timeHTML}
            </div>
            <p class="program-card-title">${event.title ?? ''}</p>
            ${descriptionHtml}
            <div class="program-card-content">
              ${contentHTML}
            </div>
            <button class="btn btn-blue details-btn">${details.card_button}</button>
          `;

          programCardsWrap.appendChild(cardDiv);

          cardDiv.querySelector('.details-btn').addEventListener('click', () => showCardDetails(event));
        });
      } else {
        let hourlyGroups = groupEventsByHour(card.events);

        Object.keys(hourlyGroups).sort(sortByTime).forEach(time => {
          const eventsForThisHour = hourlyGroups[time].sort(sortByHallAndTime);

          // Создаем заголовок для этого часового блока
          const timeHeader = document.createElement('h3');
          timeHeader.classList.add('time-header');
          timeHeader.setAttribute('data-time', time);
          timeHeader.textContent = time;
          programCardsWrap.appendChild(timeHeader);

          // Рендерим события для этого часового блока
          eventsForThisHour.forEach(event => {

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('program-card');

            let contentHTML = '';

            if (event.moderators && event.moderators.length > 0) {
              contentHTML += generateModeratorsHTML(event.moderators);
            }

            if (event.speakers && event.speakers.length > 0) {
              contentHTML += generateSpeakersHTML(event.speakers);
            }

            if (event.presenters && event.presenters.length > 0) {
              contentHTML += generatePresentersHTML(event.presenters)
            }

            if (event.jury && event.jury.length > 0) {
              contentHTML += generateJuryHTML(event.jury)
            }


            const displayTime = (event.originalTime && isDurationMoreThanAnHour(event.originalTime)) ? event.originalTime : event.time;
            const timeHTML = (!isAllHallsTabActive || isDurationMoreThanAnHour(displayTime)) ? `<div>${displayTime}</div>` : '';

            const descriptionHtml = ((event.setting && event.setting == 1) ? `<p class="program-card-desc">${event.description}</p>` : '');

            const contentFormatHTML = ((event.setting && event.setting == 2) ? '' : contentHTML);

            cardDiv.innerHTML = `
              <div class="program-card-header">
                <div>${event.hall ?? ''}</div>
                ${timeHTML}
              </div>
              <p class="program-card-title">${event.title ?? ''}</p>
              ${descriptionHtml}
              <div class="program-card-content">
                ${contentFormatHTML}
              </div>
              <button class="btn btn-blue details-btn">${details.card_button}</button>
            `;

            programCardsWrap.appendChild(cardDiv);

            cardDiv.querySelector('.details-btn').addEventListener('click', () => showCardDetails(event));
          });
        });
      }

    } else if (card.events.length == 0) {
      const dateHeader = document.createElement('h2');
      dateHeader.textContent = formatDateText(card.date);
      cardsDiv.appendChild(dateHeader);

      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = details.main_subtitle;
      emptyMessage.classList.add('empty-program-message');
      cardsDiv.appendChild(emptyMessage);
    }
  });
}

function showCardDetails(event) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'program-info-modal';

  const closeModalBtn = document.createElement('span');
  closeModalBtn.className = 'program-modal-close'
  closeModalBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#667085" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  `;
  closeModalBtn.addEventListener('click', () => {
    modalOverlay.remove();
  });

  let contentHTML = '';

  if (event.moderators && event.moderators.length > 0) {
    contentHTML += generateModeratorsHTML(event.moderators);
  }

  if (event.speakers && event.speakers.length > 0) {
    contentHTML += generateSpeakersHTML(event.speakers);
  }

  if (event.presenters && event.presenters.length > 0) {
    contentHTML += generatePresentersHTML(event.presenters)
  }

  if (event.jury && event.jury.length > 0) {
    contentHTML += generateJuryHTML(event.jury)
  }

  modal.innerHTML = `
      <div class="program-modal-header">
        <div class="blue-bg">
          ${event.hall ?? ''}
        </div>
        <div>
          ${event.originalTime ?? ''}
        </div>
      </div>
      <p class="program-modal-title">
        ${event.title ?? ''} 
      </p>
      <p class="program-modal-description">
        ${event.description ?? ''}
      </p>
      <div class="program-modal-content">${contentHTML}</div>
      <a href="/#Tickets" class="btn btn-blue">${details.modal_button}</a
  `;
  modal.appendChild(closeModalBtn);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
    }
  });
}
