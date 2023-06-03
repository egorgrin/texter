const form = document.querySelector('#userDataForm');
if (form) {

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (typeof finalloader !== 'undefined') {
            finalloader();
        }

        const data = new FormData(form);
        setTimeout(() => {
            const action = '{snippet:offer_url_https}&' + new URLSearchParams(data).toString();
            window.location.href = action;
        }, 500);
    });
}
