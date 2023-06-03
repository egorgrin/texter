function finalloader() {
    jQuery('#p_body_content').fadeOut('slow');
    jQuery('#p_loading').fadeIn('slow');
}

function scrollTo(elementId) {
    if ($('#' + elementId).length) {
        var offsetTop = $('#' + elementId).offset().top;
        $('html,body').animate({
            scrollTop: offsetTop
        }, {
            duration: 'slow'
        });
    }
}


jQuery(document).ready(function () {
    var minutesRemaining, timerInterval, currentDateTime;

    function formatTime(number) {
        return number < 10 ? '0' + number : number;
    }

    if (jQuery('#timerr').length >= 1) {
        minutesRemaining = 89;
        timerInterval = setInterval(function () {
            var minutes, seconds;
            minutes = parseInt(minutesRemaining / 60, 10);
            seconds = formatTime(parseInt(minutesRemaining % 60, 10));
            $('#timerr').text(minutes + ' ' + minuteText + seconds + ' ' + secondsText);
            minutesRemaining--;
            if (minutesRemaining < 0) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }

    currentDateTime = new Date();
    var formattedTime = formatTime(currentDateTime.getHours()) + ':' + formatTime(currentDateTime.getMinutes());
    var formattedMonth = formatTime(currentDateTime.getMonth() + 1);

    jQuery('.p_var-dia').text(currentDateTime.getDate());
    jQuery('.p_var-mes').text(formattedMonth);
    jQuery('.p_var-anyo').text(currentDateTime.getFullYear());
    jQuery('.p_var-dia_nombre').text(currentDay[currentDateTime.getDay()]);
    jQuery('.p_var-mes_nombre').text(currentMonth[currentDateTime.getMonth()]);
    jQuery('.p_var-hora_fija').text(formattedTime);

    if (jQuery('.p_var-browser').length >= 1) {
        jQuery('.p_var-browser').text(browser);
    }

    if (jQuery('.p_var-so').length >= 1) {
        jQuery('.p_var-so').text(platform);
    }
});
$(document).ready(function () {
    $('.bq1').click(function () {
        $('#q1').fadeOut('slow', function () {
            $('#q2').fadeIn('slow');
        });
    });

    $('.bq2').click(function () {
        $('#q2').fadeOut('slow', function () {
            $('#q3').fadeIn('slow');
        });
    });

    if (document.querySelector('.bq4')) {
        $('.bq3').click(function () {
            $('#q3').fadeOut('slow', function () {
                $('#q4').fadeIn('slow');
            });
        });

        $('.bq4').click(function () {
            scrollTo('top-header');
            $('#content1').fadeOut('slow', function () {
                $('#content2').fadeIn();

                setTimeout(function () {
                    $('#result1').fadeIn(1000);
                }, 3000);

                setTimeout(function () {
                    $('#result2').fadeIn(1000);
                }, 4100);

                setTimeout(function () {
                    $('#result3').fadeIn(1000);
                }, 6000);

                setTimeout(function () {
                    $('#content2').fadeOut('slow', function () {
                        boxRoot._init();
                        $('#content3').fadeIn();
                    });
                }, 7100);
            });
        });
    } else {
        $('.bq3').click(function () {
            scrollTo('top-header');
            $('#content1').fadeOut('slow', function () {
                $('#content2').fadeIn();

                setTimeout(function () {
                    $('#result1').fadeIn(1000);
                }, 3000);

                setTimeout(function () {
                    $('#result2').fadeIn(1000);
                }, 4100);

                setTimeout(function () {
                    $('#result3').fadeIn(1000);
                }, 6000);

                setTimeout(function () {
                    $('#content2').fadeOut('slow', function () {
                        boxRoot._init();
                        $('#content3').fadeIn();
                    });
                }, 7100);
            });
        });
    }
});

var boxRoot, count = 1,
    attempts = 3,
    can = !1;
!function () {
    'use strict';
    boxRoot = {
        _init: function () {
            setTimeout(function () {
                jQuery('#p_modal1').modal(settingModal);
            }, 1000);
            jQuery('.try').on('click', function () {
                if (can && count <= attempts) {
                    if (!jQuery(this).hasClass('open')) {
                        can = false;
                        jQuery('.circle-loader').removeClass('load-complete');
                        jQuery('.checkmark').css('display', 'none');
                        jQuery(this).addClass('open');

                        if (count === 2) {
                            jQuery(this).addClass('premiazo');
                            setTimeout(function () {
                                jQuery('.div_img_gift, .img_gift').fadeIn('slow', function () {
                                    setTimeout(function () {
                                        jQuery('#p_modal3').modal(settingModal);
                                        jQuery('.circle-loader').addClass('load-complete');
                                        jQuery('.checkmark').css('display', 'block');
                                    }, 1500);
                                });
                            }, 4000);
                        } else {
                            count++;
                            attempts--;
                            jQuery('#num_attempts').html(attempts);
                            setTimeout(function () {
                                jQuery('#p_modal2').modal(settingModal);
                                setTimeout(function () {
                                    jQuery('.circle-loader').addClass('load-complete');
                                    jQuery('.checkmark').css('display', 'block');
                                    can = true;
                                }, 1000);
                            }, 2000);
                        }
                    }
                }
            });

            jQuery('#p_modal_button1').on('click', function (e) {
                e.stopPropagation();
                jQuery('#p_modal1').modal('hide');
                can = true;
                scrollTo('top-header');
            });

            jQuery('#p_modal_button2').on('click', function (e) {
                e.stopPropagation();
                jQuery('#p_modal2').modal('hide');
                scrollTo('top-header');
            });

            jQuery('#p_modal_button3').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                jQuery('#p_modal3').modal('hide');

                $('#content3').fadeOut('slow', function () {
                    scrollTo('top-header');
                    $('#content-comments').fadeOut('slow');
                    $('#content4').fadeIn(1000);
                });
            });
        }
    };
}();
