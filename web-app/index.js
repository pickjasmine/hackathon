function toggleEmail() {
    $('.showEmail').slideToggle('fast');
}

function toggleText() {
    $('.showText').slideToggle('fast');
}

function toggleSlack() {
    $('.showSlack').slideToggle('fast');
}


$(document).ready(function() {

   $('#addKeyword').click(function () {
       let keyword = $('#keywordInput').val();
       let keywordId = keyword.toLowerCase();
       $('#keywordList').append('<li id="' + keywordId + '" class="draggable droppable ui-widget-content">' + keyword + '</li>');
       $('#keywordInput').val("");
       $('.draggable').draggable({
           opacity: 0.7,
           containment: '.leftSide',
           cursor: 'crosshair',
           helper: 'clone',
           grid: [ 20, 20 ]
       });
        $('.droppable').droppable({
            drop: function(event, ui) {
                ui.draggable.remove();
            }
        });
   });

});