function filterBySessionFav(fav) {
  $('#search_sessions').val('');
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
  $('#search_sessions').val('');
  data = sessions.filter(function(d) {
    if (time == 'all') {
      return true;
    }
    return d.time.replace(/am/ig, '').replace(/pm/ig, '').trim() == time.replace(/am/ig, '').replace(/pm/ig, '').trim();
  });
  loadCards(data);
}

function filterByRoomColor(room_color) {
  $('#search_sessions').val('');
  data = sessions.filter(function(d) {
    if (room_color == 'all') {
      return true;
    }
    return d.room_color == room_color;
  });
  loadCards(data);
}