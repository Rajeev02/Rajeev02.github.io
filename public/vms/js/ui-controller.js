document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        showError("Invalid Link", "No secure token was provided in the URL.");
        return;
    }

    try {
        const pass = await passService.getPassByToken(token);
        
        if (!pass) {
            showError("Pass Not Found", "The visitor pass you are looking for is invalid or does not exist.");
            return;
        }

        renderPass(pass);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('pass-container').classList.remove('hidden');

        // Optional: listen for real-time updates (e.g. guard checks them in while they are looking at the page)
        passService.subscribeToPassUpdates(token, (updatedPass) => {
            renderPass(updatedPass);
        });

    } catch (error) {
        showError("Connection Error", "Failed to connect to the server. Please try again.");
    }
});

function showError(title, message) {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('error-container').classList.remove('hidden');
    document.getElementById('pass-container').classList.add('hidden');
    
    document.getElementById('error-title').textContent = title;
    document.getElementById('error-message').textContent = message;
}

function renderPass(pass) {
    // Basic Details
    document.getElementById('visitor-name').textContent = pass.visitorName || 'Unknown';
    document.getElementById('visitor-company').textContent = pass.company || '--';
    document.getElementById('host-name').textContent = pass.hostName || pass.host || '--';
    document.getElementById('department').textContent = pass.department || '--';
    document.getElementById('purpose').textContent = pass.purpose || '--';
    
    // Dates
    const passDate = pass.validFrom ? new Date(pass.validFrom) : null;
    const visitDate = passDate ? passDate.toLocaleDateString() : (pass.visitDate ? new Date(pass.visitDate).toLocaleDateString() : '--');
    const visitTime = passDate ? passDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : (pass.visitTime || '--');
    const expiry = pass.validUntil ? new Date(pass.validUntil).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'}) : (pass.expiry ? new Date(pass.expiry).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'}) : '--');
    
    document.getElementById('visit-date').textContent = visitDate;
    document.getElementById('visit-time').textContent = visitTime;
    document.getElementById('expiry-date').textContent = expiry;

    // Photo / Initials
    const photoEl = document.getElementById('visitor-photo');
    const initialsEl = document.getElementById('visitor-initials');
    const photoUrl = typeof pass.photoUrl === 'string' && /^https?:\/\//i.test(pass.photoUrl) ? pass.photoUrl : '';
    
    if (photoUrl) {
        photoEl.src = photoUrl;
        photoEl.classList.remove('hidden');
        initialsEl.classList.add('hidden');
    } else {
        photoEl.src = '/placeholder.svg';
        photoEl.classList.remove('hidden');
        initialsEl.classList.add('hidden');
    }

    // Status
    const statusText = document.getElementById('status-text');
    const statusBanner = document.getElementById('status-banner');
    
    const currentStatus = (pass.status || 'APPROVED').toUpperCase();
    statusText.textContent = currentStatus;
    
    statusBanner.className = 'status-banner'; // reset
    statusBanner.classList.add(`status-${currentStatus.toLowerCase().replace('_', '-')}`);

    // QR Code Visibility Rules
    const qrSection = document.getElementById('qr-section');
    const qrUnavailable = document.getElementById('qr-unavailable-section');
    const qrMessage = document.getElementById('qr-unavailable-message');
    
    const now = Date.now();
    const validFromTime = pass.validFrom ? new Date(pass.validFrom).getTime() : 0;
    const validUntilTime = pass.validUntil ? new Date(pass.validUntil).getTime() : 0;
    const isOutsideWindow = (validFromTime && now < validFromTime) || (validUntilTime && now > validUntilTime);
    const hiddenStatuses = ['EXPIRED', 'REVOKED', 'CANCELLED', 'CHECKED_OUT', 'SCANNED'];
    
    if (hiddenStatuses.includes(currentStatus) || isOutsideWindow) {
        qrSection.classList.add('hidden');
        qrUnavailable.classList.remove('hidden');
        qrMessage.textContent = isOutsideWindow ? 'Pass is outside its valid time window' : `Pass is ${currentStatus.toLowerCase().replace('_', ' ')}`;
    } else {
        qrSection.classList.remove('hidden');
        qrUnavailable.classList.add('hidden');
        
        // Render QR
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = ''; // clear previous
        new QRCode(qrContainer, {
            text: pass.qrValue || pass.token || pass.qrToken, // Secure token
            width: 160,
            height: 160,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.Q
        });
    }
}
