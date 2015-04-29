// Execute JavaScript on page load

var myEndpoint,
    supportConversation;
// Create an endpoint to add to the conversation
function createEndpoint() {
    // Create a deferred object to use jQuery promise
    var deferred = new $.Deferred();

    new Twilio.Endpoint.createWithToken(capabilityToken).then(function(endpoint) {
        // keep a reference for making outbound calls later
        myEndpoint = endpoint;

        // automatically answer any incoming calls
        myEndpoint.on('invite', function(invite) {

            // show the video area and streams
            $('.video-streams').addClass('active');

            invite.accept().then(function(conversation) {
                showVideoStreams(conversation);
            });
        });
        deferred.resolve(endpoint);

    }, function(error) {
        console.error('Could not connect to Twilio');
        console.dir(error);
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
    // show local video
    var localVideoElement = $('#my-video').get(0);

    // create a localStream object to mute and end
    supportConversation = conversation;

    conversation.localStream.attach(localVideoElement);
    // show local address
    $('.local-video-label').html(myEndpoint.address);

    conversation.on('participantJoined', function(participant) {
        // show participant video
        var remoteVideoElement = $('#remote-video').get(0);
        participant.stream.attach(remoteVideoElement);

        // show participant address
        $('.remote-video-label').html(participant.address);
    })
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

function muteStream() {
    supportConversation.localStream.muted = !supportConversation.localStream.muted;

}

function endStream() {
    supportConversation.leave();
    // show the video area and streams
    $('.video-streams').removeClass('active');
}


$(function() {
    $('.request-support').click(function(e) {
        e.preventDefault();
        createTicket();
    });

    $('.connect-call').click(function(e) {
        e.preventDefault();
        customerEndpoint = $(e.currentTarget).data('endpoint');
        ticketId = $(e.currentTarget).data('ticket');
        callCustomer(customerEndpoint, ticketId);
    });

    $('.mute-video').click(function(e) {
        e.preventDefault();
        $('.mute-video').toggle();
        muteStream();
    });

    $('.end-video').click(function(e) {
        e.preventDefault();
        endStream();
    });
});