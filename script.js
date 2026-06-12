// Get registrations from localStorage
function getRegistrations() {
  return JSON.parse(localStorage.getItem('registrations')) || [];
}

// Save registrations to localStorage
function saveRegistrations(data) {
  localStorage.setItem('registrations', JSON.stringify(data));
}

// Update stats on Home page
function updateStats() {
  const totalEventsEl = document.getElementById('totalEvents');
  const totalRegsEl = document.getElementById('totalRegistrations');
  if (totalEventsEl) {
    totalEventsEl.innerText = 3; // Fixed 3 events
    totalRegsEl.innerText = getRegistrations().length;
  }
}

// Update event registration counts on Events page
function updateEventCounts() {
  const regs = getRegistrations();
  const events = ['Hackathon 2026', 'Technical Workshop', 'Cultural Fest'];
  
  events.forEach(event => {
    const count = regs.filter(r => r.event === event).length;
    const el = document.getElementById(`count-${event}`);
    if (el) el.innerText = count;
  });
}

// Show message
function showMessage(text, type) {
  const msgEl = document.getElementById('message');
  if (msgEl) {
    msgEl.innerText = text;
    msgEl.className = type;
    setTimeout(() => {
      msgEl.innerText = '';
      msgEl.className = '';
    }, 3000);
  }
}

// Render registration list on Register page
function renderRegistrations() {
  const listEl = document.getElementById('registrationList');
  if (!listEl) return;
  
  const regs = getRegistrations();
  listEl.innerHTML = '';
  
  if (regs.length === 0) {
    listEl.innerHTML = '<p class="empty">No registrations yet.</p>';
    return;
  }
  
  regs.slice().reverse().forEach((reg, index) => {
    const div = document.createElement('div');
    div.className = 'reg-item';
    div.innerHTML = `
      <span><strong>${reg.name}</strong> - ${reg.event}</span>
      <button class="delete-btn" onclick="deleteRegistration(${regs.length - 1 - index})">Delete</button>
    `;
    listEl.appendChild(div);
  });
}

// Delete registration
function deleteRegistration(index) {
  if (!confirm('Delete this registration?')) return;
  let regs = getRegistrations();
  regs.splice(index, 1);
  saveRegistrations(regs);
  renderRegistrations();
  updateStats();
  updateEventCounts();
}

// Handle form submit on Register page
const form = document.getElementById('registrationForm');
if (form) {
  // Auto-select event from URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventParam = urlParams.get('event');
  if (eventParam) {
    document.getElementById('eventName').value = eventParam;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const eventName = document.getElementById('eventName').value;
    
    if (!name || !email || !eventName) {
      showMessage('Please fill all fields', 'error');
      return;
    }
    
    let regs = getRegistrations();
    const exists = regs.some(r => r.email === email && r.event === eventName);
    
    if (exists) {
      showMessage('This email already registered for this event', 'error');
      return;
    }
    
    regs.push({ name, email, event: eventName, time: new Date().toLocaleString() });
    saveRegistrations(regs);
    
    showMessage(`Success! ${name} registered for ${eventName}`, 'success');
    form.reset();
    renderRegistrations();
    updateEventCounts();
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  updateStats();
  updateEventCounts();
  renderRegistrations();
});
