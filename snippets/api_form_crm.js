if (document.querySelector('#userDataForm')) {
    if (typeof jQuery == 'undefined') {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    $(function () {
        $('#userDataForm').submit(function (event) {
            event.preventDefault();
            // script link
            let appLink = 'https://fbgtracking.site/api/';
            let form = $('#' + $(this).attr('id'))[0];
            let fd = new FormData(form);
            fd.append('product', productName);
            fd.append('country', '{country}');
            fd.append('visitid', '{visit.id}');
            fd.append('userip', '{ip}');
            $.ajax({
                url: appLink,
                type: 'POST',
                data: fd,
                processData: false,
                contentType: false,
                beforeSend: function () {
                },
            }).done(function (res, textStatus, jqXHR) {

                if (jqXHR.readyState === 4 && jqXHR.status === 200) {
                    console.log('Sended');
                } else {
                    console.log('CRM: 200');
                }
            }).fail(function (res, textStatus, jqXHR) {
                console.log('Applink error');
            });
        });
    }(jQuery));
}
