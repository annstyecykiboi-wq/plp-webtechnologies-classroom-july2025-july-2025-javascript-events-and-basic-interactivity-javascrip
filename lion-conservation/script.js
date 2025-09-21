// Section 1: Event Handling Setup
// Select form and interactive elements
const form = document.getElementById('conservation-form');
const toggleFactsButton = document.getElementById('toggle-facts');
const enlargeMediaButton = document.getElementById('enlarge-media');
const formStatus = document.getElementById('form-status');

// Attach event listeners
if (form) {
    form.addEventListener('submit', handleFormSubmit);
}
if (toggleFactsButton) {
    toggleFactsButton.addEventListener('click', toggleFactsVisibility);
}
if (enlargeMediaButton) {
    enlargeMediaButton.addEventListener('click', toggleMediaSize);
}

// Section 2: Interactive Feature 1 - Toggle Facts Visibility
// Toggles visibility of the lion facts list
function toggleFactsVisibility() {
    const factsList = document.querySelector('.lion-facts');
    if (factsList.style.display === 'none') {
        factsList.style.display = 'block';
        toggleFactsButton.textContent = 'Hide Facts';
    } else {
        factsList.style.display = 'none';
        toggleFactsButton.textContent = 'Show Facts';
    }
}

// Section 3: Interactive Feature 2 - Toggle Media Size
// Enlarges or shrinks media elements
function toggleMediaSize() {
    const mediaContainer = document.querySelector('.media-container');
    mediaContainer.classList.toggle('enlarged');
    enlargeMediaButton.textContent = mediaContainer.classList.contains('enlarged') ? 'Shrink Media' : 'Enlarge Media';
}

// Section 4: Custom Form Validation
// Validates form inputs and displays status
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default submission

    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pledgeType = document.getElementById('pledge-type').value;
    const message = document.getElementById('message').value.trim();
    const newsletter = document.getElementById('newsletter').checked;

    // Validation rules
    let errors = [];

    // Name: Required, 2-50 characters
    if (!name || name.length < 2 || name.length > 50) {
        errors.push('Name must be 2-50 characters.');
    }

    // Email: Required, basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Enter a valid email address.');
    }

    // Phone: Optional, but if provided, must be 10 digits
    if (phone && !/^\d{10}$/.test(phone)) {
        errors.push('Phone must be a 10-digit number.');
    }

    // Pledge type: Required
    if (!pledgeType) {
        errors.push('Please select a pledge type.');
    }

    // Message: Required, 10-500 characters
    if (!message || message.length < 10 || message.length > 500) {
        errors.push('Message must be 10-500 characters.');
    }

    // Display validation result
    if (errors.length > 0) {
        formStatus.textContent = 'Errors: ' + errors.join(' ');
        formStatus.style.backgroundColor = '#f8d7da'; // Red for errors
    } else {
        formStatus.textContent = `Thank you, ${name}! Your ${pledgeType} pledge is received. ${newsletter ? 'You’re subscribed to updates!' : ''}`;
        formStatus.style.backgroundColor = '#d4edda'; // Green for success
        form.reset(); // Clear form
    }
}