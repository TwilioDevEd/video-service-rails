// Stash some objects in the global scope
var myEndpoint,
    supportConversation;
// Create an endpoint to add to the conversation
function createEndpoint() {
    // Create a deferred object to use jQuery promise
    var deferred = new $.Deferred();

    myEndpoint = new Twilio.Endpoint(capabilityToken);
    myEndpoint.on('invite', function(invite) {

        // show the video area and streams
        $('.video-streams').addClass('active');

        invite.accept().then(showVideoStreams);
    });

    myEndpoint.listen().then(function() {
        deferred.resolve(myEndpoint);
    });
    return deferred.promise();
}

// Create a support ticket
function createTicket() {
    url = window.location.href;
    $.when(createEndpoint()).done(function() {
        
        // Create a support ticket
        $.post('/support/create', {endpoint: myEndpoint.address, product_id: url}, function( data ) {
            $('.support-status').html('Finding an available agent...')
        });
    })
}

// Delete a support ticket
function deleteSupportTicket(ticketId) {

    function removeTicketRow() {
        $("#ticket-" + ticketId).remove();
    }
    // Create a support ticket
    $.ajax({
        type: 'DELETE',
        url: "/support/" + ticketId,
        success: removeTicketRow
    });

}

// incoming or outgoing, display streams on screen
function showVideoStreams(conversation) {
    // Attach to DOM
    conversation.localMedia.attach('#local-video');

    // Listen for participants
    conversation.on('participantConnected', function(participant) {
        participant.media.attach('#remote-video');
    });

    conversation.on('participantDisconnected', function(participant) {
        conversation.localMedia.stop();
        conversation.leave();
    });
};

function callCustomer(customerEndpoint, ticketId) {
    $('.video-streams').addClass('active');

    // Use jQuery Promise to check when our endpoint is created
    $.when(createEndpoint()).done(function() {
        // Create the conversation with the customers endpoint
        myEndpoint.createConversation(customerEndpoint).done(function(conversation) {

            // show the videos
            showVideoStreams(conversation);

            // delete the support ticket
            deleteSupportTicket(ticketId);

        }, function(error) {
            console.error('Unable to set up call.');
            console.dir(error);
        });
    })
};


$(function() {
    // Customer requests support
    $('.request-support').click(function(e) {
        e.preventDefault();
        createTicket();
    });

    // Agent initiates call
    $('.connect-call').click(function(e) {
        e.preventDefault();
        customerEndpoint = $(e.currentTarget).data('endpoint');
        ticketId = $(e.currentTarget).data('ticket');
        callCustomer(customerEndpoint, ticketId);
    });
});