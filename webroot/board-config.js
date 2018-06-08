gOptions = {
  // This can have nested stuff, arrays, etc.
  enabled: true,
  city: 'Columbus',
  venue_name: '',
  venue_address: '',
  // google_sheet_url: 'https://docs.google.com/spreadsheets/d/19NhwtckaO9KfabuFPX9vlcNEnjOUXVy1OAq9kJgA5Rk/edit?usp=sharing',
  google_sheet_url: 'https://docs.google.com/spreadsheets/d/1JBKvCuqTfYUocOqtOX7DOhEKrN4E38paAeV-ktLouos/edit?usp=sharing',
  room_count: 'five', // enter this as word (it's needed for JavaScript library styling, e.g. 'one', 'two', 'six')
  rooms: [
    {
      "color": "all",
      "name" : "all",
      "sponsor": "all",
      "room_capacity": 200
    },
    {
      "color": "red",
      "name" : "Franklin",
      "sponsor": "Sponsor 1",
      "room_capacity": 200
    },
    {
      "color": "orange",
      "name" : "Delaware",
      "sponsor": "Sponsor 2",
      "room_capacity": 60
    },
    {
      "color": "yellow",
      "name" : "Roosevelt",
      "sponsor": "Sponsor 3",
      "room_capacity": 100
    },
    {
      "color": "green",
      "name" : "Clinton",
      "sponsor": "Sponsor 4",
      "room_capacity": 50
    }
  ],
  links: [
    {
      text: '#MeasureCampSF',
      title: '#MeasureCampSF',
      href: 'https://twitter.com/hashtag/MeasureCampSF?src=hash'
    },
    {
      text: 'New Tweet',
      title: 'New Tweet',
      href: 'http://twitter.com/intent/tweet?hashtags=MeasureCampSF'
    },
    {
      text: 'Floor Plan',
      title: 'Floor Plan',
      href: 'images/Fawcett Floorplan Oct17.pdf'
    }
  ]
}
