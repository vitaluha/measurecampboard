function loadCards(data) {
  if (!data) {
    return;
  }
  var i = 0;
  divs = `<div class="ui five stackable cards">`;
  for (x in data) {
    var session = data[x];
    var room_color = session.room_color ? session.room_color : '&#160;',
      room_sponsor = session.room_sponsor ? session.room_sponsor : '&#160;',
      time = session.time ? session.time.replace(/am/ig, '').replace(/pm/ig, '').trim() : '&#160;',
      title = session.title ? session.title : '&#160;',
      description = session.description ? session.description : '&#160;',
      twitter = session.twitter ?
        '<a title="' + session.twitter + '" target="_blank" href="https://www.twitter.com/' +
          session.twitter + '"><i class="twitter icon"></i>' + session.speaker + '</a>' :
        undefined,
      speaker = twitter ?
        twitter :
        session.speaker ? session.speaker : '<i title="Anonymous Coward" class="user secret icon"></i>',
      tags = session.tags ? session.tags : 'N/A',
      focus = session.focus === 'B' ? 'Business'   : session.focus === 'T' ? 'Technical' : '&#160;',
      level = session.level === 'N' ? 'Beginner'   : session.level ===  'A' ? 'Advanced' : '&#160;',
      type = session.type === 'P' ? 'Presentation' : session.type === 'D' ? 'Discussion' : '&#160;',
      av = session.av === 'AV' ?
        '<i title="Audio/Video" class="large file audio outline icon"></i>' :
        '<i title="Whiteboard only" class="large clipboard outline icon"></i>',
      capacity = session.capacity ? session.capacity : 'N/A';
    var jsonSession = JSON.stringify(session).toString();
    var dataId = x;
    var tagsHtml = buildTags(tags);
    // TODO: refactor into more modular/readable code
    var sessionSelect = '';
    var cardSaved = localStorage.getItem('card' + i);
    if (cardSaved === 'true' || cardSaved === true) {
      sessionSelect = 'session-select';
    }
    session['session-select'] = cardSaved;
    if (description === '&#160;') {
      divs += `
        <div class="card ${dataId} ${sessionSelect}" data-id="${dataId}">
          <div class="content">
            <h5 class="ui ${room_color} header">
              <span class="session-time-header">${time}</span>
              <span class="heart-right">
                <i title="Add to Calendar" class="${room_color} heart outline icon add-to-call" onclick="addToCall(${dataId})"></i>
              </span>
            </h5>
            <h4 style="text-align: center;">No Session</h4>
          </div>
          <div class="extra content">
            <div class="ui mini labels session-tags">
              ${tagsHtml}
            </div>
            <div title="Room Capacity: ${capacity}" class="ui circular basic  label no-border">
              ${capacity}
              <i class="icon users"></i>
            </div>
            <div class="ui ${room_color} basic  circular label">
              ${room_sponsor}
            </div>
          </div>
        </div>
      `;
    } else {
      divs += `
        <div class="card ${dataId} ${sessionSelect}" data-id="${dataId}">
          <div class="content">
            <h5 class="ui ${room_color} header">
              <span class="session-time-header">${time}</span>
              <div class="ui basic label speaker-twitter">
                ${speaker}
              </div>
              <span class="heart-right">
                <i title="Add to Calendar" class="${room_color} heart outline icon add-to-call" onclick="addToCall(${dataId})"></i>
              </span>
            </h5>
            <div class="left aligned card-header">
              ${title}
            </div>
            <span class="tag-labels">${level} | </span>
            <span class="tag-labels">${focus} | </span>
            <span class="tag-labels">${type}</span>

            <div class="description">
              ${description}
            </div>

          </div>
          <div class="extra content">
            <div class="ui mini labels session-tags">
              ${tagsHtml}
            </div>
            <div title="Room Capacity: ${capacity}" class="ui circular basic  label no-border">
              ${capacity}
              <i class="icon users"></i>
            </div>
            <div class="ui ${room_color} basic  circular label">
              ${room_sponsor}
            </div>
          </div>
        </div>
      `;
    }
    i++;

  }

  divs += `</div>`;
  divs += `
    <button class="ui basic button built-by"
        title="https://www.linkedin.com/in/vitaliymatiyash/"
        onclick="window.open('https://www.linkedin.com/in/vitaliymatiyash/',  '_blank')">
      Built by Vitaliy Matiyash
    </button>
    `;
  document.getElementById("demo").innerHTML = divs;
  // $('.calendar.plus.outline.icon.right.floated')
}

function loadToastrNotif() {
  loadToastrOptions();
  toastr["info"]("Session 1 is now at 12:20pm", "Session time changed!");
  toastr["info"]("Session 1 is now at 11:45pm", "Session time changed!");
}
function loadToastrOptions() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "0",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
}


function buildSessionTimes(data) {
  if (!data) {
    return;
  }
  var allTimes = data.map(function(d) {
    return(d.time.replace(/am/ig, '').replace(/pm/ig, '').trim())
  });
  var times = new Set(allTimes);
  var divs = `<div class="ui labels">`;
  times.forEach(function(d) {
    divs += `<div class="ui grey basic tiny label session-time" onclick="filterBySessionTime('${d}')">${d}</div>`;
  });
  divs += '</div>';

  document.getElementById("times").innerHTML = divs;
}
function buildSessionFavs() {
  var divs = `
    <button class="ui toggle button center floated" onclick="filterBySessionFav(this)">
      <i title="Show My Sessions" class="heart icon"></i>My Sessions
    </button>
  `;

  /*var divs = `<div class="ui buttons">`;
  divs += `<div class="ui button active" onclick="filterBySessionFav('all')">All</div>`;
  divs += `<div class="ui button" onclick="filterBySessionFav('fav')">Fav</div>`;
  divs += '</div>';*/

  document.getElementById("favs").innerHTML = divs;
}

function filterBySessionFav(fav) {
  if (fav.innerHTML == 'All') {
    // Show ALL sessions
    data = sessions.filter(function(d, i) {
      fav.innerHTML = '<i title="Show My Sessions" class="heart icon"></i>My Sessions';
      return true;
    });
    loadCards(data);
  } else {
    data = sessions.filter(function(d, i) {
      // Show only 'Fav' sessions
      fav.innerHTML = 'All';
      return d['session-select'] === 'true' || d['session-select'] === true;
    });
    loadCards(data);
    // Temporary remove 'selected/faved' class
    $('.card').removeClass('session-select');
  }
}

// TODO: handle time little better
function filterBySessionTime(time) {
  data = sessions.filter(function(d) {
    if (time == 'all') {
      return true;
    }
    return d.time.replace(/am/ig, '').replace(/pm/ig, '').trim() == time.replace(/am/ig, '').replace(/pm/ig, '').trim();
  });
  loadCards(data);
}

// TODO: rethink 'add-to-calendar feature'
function addToCall(data) {
  console.log(data)
  // var card = $('.card.'+data);
  var card = $('.card[data-id="' + data + '"]');
  if (sessions[data]['session-select'] === 'true' || sessions[data]['session-select'] === true) {
    sessions[data]['session-select'] = false;
    card.removeClass('session-select');
    localStorage.setItem('card'+data, false);
  } else {
    sessions[data]['session-select'] = true;
    card.addClass('session-select');
    localStorage.setItem('card'+data, true);
  }
  // OLD: Add to calendar
  /*var event = sessions[data];
  var description = buildEventDescription(event);
  var begin = '4/28/2018 ' + event.time.split('-')[0].trim();
  var end = '4/28/2018 ' + event.time.split('-')[1].trim();
  var beginF = new Date(begin.replace('am', ' am').replace('pm', ' pm'));
  var endF = new Date(end.replace('am', ' am').replace('pm', ' pm'));
  var cal = new ics();

  cal.addEvent(event.title, description, event.room_color + ' room', beginF, endF);
  cal.download(event.title);*/
}

// TODO: improve event description card
function buildEventDescription(data) {
  var title = data.title ? data.title : ' ';
  var description = data.description ? data.description : ' ';
  var speaker = data.speaker ? data.speaker : ' ';
  var room_color = data.room_color ? data.room_color : ' ';
  var desc = `
    Topic: ${title}\\n
    Description: ${description}\\n
    Speaker: ${speaker}\\n
    Room: ${room_color}\\n
  `
  return desc;
}
