// Execute JavaScript on page load
createTicket = function() {
    url = window.location.href;
    $.post('/support/create', {endpoint: 'customer', product_id: url}, function( data ) {
        $('.support-status').html('Finding an available agent...')
    })
}

$(function() {
    $('.request-support').click(function(e) {
        e.preventDefault();
        createTicket();
    })
});