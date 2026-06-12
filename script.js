// Data from localStorage or empty
let events = JSON.parse(localStorage.getItem('events')) || [];
let registrations = JSON.parse(localStorage.getItem('registrations')) || {};
let selectedEventId = null;

// Get DOM elements
const eventForm = document.getElementById('eventForm');
const eventList = document.getElementById('eventList');
const registerForm = document.getElementById('registerForm');
const registerSection = document.getElementById('registerSection');
const registerTitle = document.getElementById('registerTitle');
const registrationList = document.getElementById('registrationList');

// Save data to localStorage
const saveData = () => {
  localStorage.setItem('events', JSON.stringify(events));
  localStorage.setItem('registrations', JSON.stringify(registrations));
};

// Render all events
const renderEvents = () => {
  eventList.innerHTML = '';
  if (events.length === 0) {
    eventList.innerHTML = '<div class="empty">No events yet. Create one!</div>';
    return;
  }

  events.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event-item';
    div.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.description}</p>
      <button onclick="showRegister(${event.id}, '${event.title.replace(/'/g, "\\'")}')">View & Register</button>
      <button class="delete-btn" onclick="deleteEvent(${event.id})">Delete</button>
    `;
    eventList.appendChild(div);
  });
};

// Create new event
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newEvent = {
    id: Date.now(),
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    date: document.getElementById('date').value,
    location: document.getElementById('location').value
  };
  events.unshift(newEvent);
  saveData();
  renderEvents();
  eventForm.reset();
});

// Show register section for selected event
window.showRegister = (event
