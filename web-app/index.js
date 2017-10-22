function toggleEmail() {
    $('.showEmail').slideToggle('fast');
}

function toggleText() {
    $('.showText').slideToggle('fast');
}

function toggleSlack() {
    $('.showSlack').slideToggle('fast');
}

function makeRequest() {
    var jsonBlob = createJSON();
    console.log(jsonBlob);
    $.ajax({
        url: "/submit",
        dataType: 'json',
        data: jsonBlob,
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        success: function (result) {
            console.log(results);
        },
    });
}

function getJobLevel() {
    let jobLevel = [];
    if (document.getElementById('entryLevel').checked === true) {
        jobLevel.push('entryLevel');
    }
    if (document.getElementById('midLevel').checked === true) {
        jobLevel.push('midLevel');
    }
    if (document.getElementById('seniorLevel').checked === true) {
        jobLevel.push('seniorLevel');
    }
    return jobLevel;
}

function getJobType() {
    let jobType = [];
    if (document.getElementById('fullTime').checked === true) {
        jobType.push('fullTime');
    }
    if (document.getElementById('partTime').checked === true) {
        jobType.push('partTime');
    }
    return jobType;
}

function getContactMethod() {
    let contactMethod = [];
    if (document.getElementById('email').checked === true) {
        contactMethod.push('email');
    }
    if (document.getElementById('text').checked === true) {
        contactMethod.push('text');
    }
    if (document.getElementById('slack').checked === true) {
        contactMethod.push('slack');
    }
    return contactMethod;
}


function createJSON() {
    var keys = [];
    for (var i = 0; i < document.getElementsByClassName('key').length; i++) {
        keys.push(document.getElementsByClassName('key')[i].innerHTML);
    }
    let formElements = {
        location: document.getElementById('locationInput').value,
        jobLevel: getJobLevel(),
        jobType: getJobType(),
        keywords: keys,
        contactMethod: getContactMethod(),
        email: document.getElementById('emailInput').value,
        phoneNumber: document.getElementById('phoneInput').value,
        slack: document.getElementById('slackInput').value
    };
    return JSON.stringify(formElements);
}

$(document).ready(function () {
    let keywordCount = 0;
    let keywords = [];

    $('#addKeyword').click(function () {
        if (keywordCount < 3) {
            let keyword = $('#keywordInput').val();
            let keywordId = keyword.toLowerCase();
            $('#keywordList').append('<li id="' + keywordId + '" class="key draggable droppable ui-widget-content">' + keyword + '</li>');
            keywords[keywordCount] = keywordId;
            keywordCount++;
            $('#keywordInput').val("");
            $('.draggable').draggable({
                opacity: 0.7,
                containment: '.leftSide',
                cursor: 'move',
                helper: 'clone',
                grid: [30, 30],
                cursorAt: {top: 0, left: 0}
            });
        } else {
            $('#keywordInput').val('Sorry, 3 keywords max');
        }
    });

    $('.droppable').droppable({
        drop: function (event, ui) {
            ui.draggable.remove();
            keywordCount--;
        }
    });
});