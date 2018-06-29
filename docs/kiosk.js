'use strict';

var quotes = [{
    who: 'students',
    what: 'SMU Masters in Data Science',
    size: '5rem',
    gradient: '',
    text: 'It is a very challenging program. I really like the "human" interaction. My husband received his MSIS online from another university and <strong>it was nothing like this</strong>.'
}, {
    who: 'students',
    what: 'MBA@UNC',
    size: '5rem',
    gradient: '',
    text: '[It is] an excellent combination between <strong>flexibility</strong> of an online degree with perks of interaction and <strong>networking opportunity</strong> of a full time degree'
}, {
    who: 'students',
    what: 'finding things in the LMS',
    size: '5rem',
    gradient: '',
    text: 'Some [faculty] post files on the course wall and others post them in the "files" tab. It <strong>gets confusing jumping back and forth</strong> trying to find where the teacher placed the thing you need to open.'
}, {
    who: 'students',
    what: 'the curriculum',
    size: '5rem',
    gradient: '',
    text: '<strong>It is rigorous and covers essential MBA topics</strong>. While finance and accounting are not courses that I would want to take for fun, they\'re definitely needed in understanding how business works.'
}, {
    who: 'faculty',
    what: 'their online students',
    size: '7rem',
    gradient: '',
    text: 'I love the <strong>diversity of experiences</strong> and ideas that they bring to our live sessions!'
}];

// Use this to test out the whole list of quotes before pushing
var test = false;
var i = 0;

// Get quote element
var quote = document.getElementById('quote');

function setup(el, arry, index) {
    document.getElementById('who').innerHTML = arry[index].who;
    document.getElementById('what').innerHTML = arry[index].what;
    el.style.fontSize = arry[index].size;
}

function testLoop() {
    if (i == quotes.length) {
        i = 0;
    }
    setup(quote, quotes, i);
    quote.innerHTML = quotes[i].text;
    i++;
}

if (test) {
    testLoop();
    setInterval(function () {
        testLoop();
    }, 3000);
} else {

    // Get random index;
    var i = Math.floor(Math.random() * quotes.length);

    // Setup the who, what, and font-size
    setup(quote, quotes, i);

    // Run typed plugin
    new Typed('#quote', {
        strings: [quotes[i].text + '&rdquo;'],
        typeSpeed: 30,
        showCursor: true
    });
}