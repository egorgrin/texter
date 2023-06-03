function pushToDataLayer(event) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
}

function trackEvent(event) {
    if (typeof fbq === 'function') {
        fbq('track', event);
    }

    pushToDataLayer({'event': event});
}

setTimeout(function () {
    trackEvent('Time15');
}, 15 * 1000);
setTimeout(function () {
    trackEvent('Time30');
}, 30 * 1000);
setTimeout(function () {
    trackEvent('Time60');
}, 60 * 1000);
