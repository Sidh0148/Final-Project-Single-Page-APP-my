// Navigation and Focus Management
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetSection = document.querySelector(event.target.getAttribute('href'));

        // Hide all sections and remove aria-current from links
        document.querySelectorAll('.page-section').forEach(section => section.classList.add('hidden'));
        document.querySelectorAll('.nav-link').forEach(link => link.removeAttribute('aria-current'));

        // Show the target section and set aria-current
        targetSection.classList.remove('hidden');
        targetSection.setAttribute('tabindex', '-1'); // Allow focus
        targetSection.focus();
        event.target.setAttribute('aria-current', 'page');

        // Update history state
        history.pushState(null, '', event.target.getAttribute('href'));
    });
});

// Modal Functionality
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');

openModalButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();

    // Trap focus inside the modal
    modal.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', closeOnEscape);
});

closeModalButton.addEventListener('click', closeModal);

function closeModal() {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    openModalButton.focus();
    modal.removeEventListener('keydown', trapFocus);
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

function trapFocus(event) {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }
}

// Show/Hide Form Section
document.getElementById('purpose').addEventListener('change', event => {
    const eventDetails = document.getElementById('eventDetails');
    if (event.target.value === 'speakers') {
        eventDetails.classList.remove('hidden');
    } else {
        eventDetails.classList.add('hidden');
    }
});

// Form Submission and Accessibility Feedback
document.getElementById('scheduleForm').addEventListener('submit', event => {
    event.preventDefault();
    const liveRegion = document.getElementById('live-region');
    liveRegion.textContent = 'Thank you! Your call has been scheduled successfully.';
    alert('Thank you! Your call has been scheduled successfully.');
});

// Accessibility: Add Live Region for Dynamic Updates
const liveRegion = document.createElement('div');
liveRegion.setAttribute('id', 'live-region');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.style.position = 'absolute';
liveRegion.style.left = '-9999px'; // Hide visually but available for screen readers
document.body.appendChild(liveRegion);

// Switch Functionality
const switchElement = document.getElementById('emailUpdates');
switchElement.addEventListener('click', () => {
    const isChecked = switchElement.getAttribute('aria-checked') === 'true';
    switchElement.setAttribute('aria-checked', !isChecked);
});




