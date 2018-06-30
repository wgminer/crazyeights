$(function () {
    console.log('running');
    
});

function beep () {
    var audio = new Audio('beep.mp3');
    audio.play();
}

var i = 1;
var loop;
function start () {
    clearInterval(loop);
    $('body').addClass('hide-instructions');
    setTimeout(function () {
        $('body').addClass('running');
        $('#' + i).addClass('up');
        loop = setInterval(function () {
            beep();
            $('#' + (i+1)).addClass('up');
            $('#' + i).addClass('done');
            i++;
            if (i == 9) {
                i=8;
                setTimeout(() => {
                    beep();
                    setTimeout(() => {
                        beep();
                    }, 100);
                }, 100);
                clearInterval(loop);
                setTimeout(function () {
                    unwind();
                }, 2000);
            }
        }, 1000 * 60);
    }, 1250);
}

function restart () {
    clearInterval(loop);
    $('#' + i).removeClass('done');
    loop = setInterval(function () {
        $('#' + (i-1)).removeClass('done');
        $('#' + i).removeClass('up');
        i--;
        if (i == 0) {
            clearInterval(loop);
            $('body').removeClass('running');
            setTimeout(function () {
                $('body').removeClass('hide-instructions');
            }, 500);
        }
    }, 250);
}

$('.js-start').click(start);
$('.js-restart').click(restart);

