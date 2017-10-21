function toggleEmail() {
    $('.showEmail').slideToggle('fast');
}

function toggleText() {
    $('.showText').slideToggle('fast');
}

function toggleSlack() {
    $('.showSlack').slideToggle('fast');
}


$(document).ready(function () {
    let keywordCount = 0;

    $('#addKeyword').click(function () {
        if (keywordCount < 3) {
            let keyword = $('#keywordInput').val();
            let keywordId = keyword.toLowerCase();
            $('#keywordList').append('<li id="' + keywordId + '" class="draggable droppable ui-widget-content">' + keyword + '</li>');
            keywordCount++;
            $('#keywordInput').val("");
            $('.draggable').draggable({
                opacity: 0.7,
                containment: '.leftSide',
                cursor: 'move',
                helper: 'clone',
                grid: [30, 30],
                cursorAt: {bottom: 0, right: 0}
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