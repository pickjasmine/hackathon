function toggleEmail() {
    $('.showEmail').slideToggle('fast');
}

function toggleText() {
    $('.showText').slideToggle('fast');
}

function toggleSlack() {
    $('.showSlack').slideToggle('fast');
}

function getJobLevel() {
    let jobLevel = [];
    if ($('#entryLevel').is(':checked')) {
        jobLevel.push('entryLevel');
    }
    if ($('#midLevel').is(':checked')) {
        jobLevel.push('midLevel');
    }
    if ($('#seniorLevel').is(':checked')) {
        jobLevel.push('seniorLevel');
    }
    return jobLevel;
}

function getJobType() {
    let jobType = [];
    if ($('#fullTime').is(':checked')) {
        jobType.push('fullTime');
    }
    if ($('#partTime').is(':checked')) {
        jobType.push('partTime');
    }
    return jobType;

}

function getContactMethod() {
    let contactMethod = [];
    if ($('#email').is(':checked')) {
        contactMethod.push('email');
    }
    if ($('#text').is(':checked')) {
        contactMethod.push('text');
    }
    if ($('#slack').is(':checked')) {
        contactMethod.push('slack');
    }
    return contactMethod;
}

function getKeywords() {
    let keywords = $('#keywords').val().split(",");
    return keywords;
}

function createJSON() {
    let formElements = {
        location: $('#locationInput').val(),
        searchRadius: $('#searchRadius').val(),
        jobLevel: getJobLevel(),
        jobType: getJobType(),
        keywords: getKeywords(),
        contactMethod: getContactMethod(),
        email: $('#emailInput').val(),
        phoneNumber: $('#phoneInput').val(),
        slack: $('#slackInput').val()
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
            $('#keywordList').append('<li id="' + keywordId + '" class="draggable droppable ui-widget-content">' + keyword + '</li>');
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

    $('#submit').click(function () {
        $('#keywords').val(keywords);
        createJSON();
    })
});