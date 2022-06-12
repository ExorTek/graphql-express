const Event = require( '../../models/event' );
const Booking = require( '../../models/booking' );
const { transformBooking,transformEvent } = require( './merge' );

const bookings = async ( args,req ) => {
    try {
        const bookings = await Booking.find();
        return bookings.map( booking => {
            return transformBooking( booking );
        } );
    } catch ( err ) {
        throw err;
    }
};
const bookEvent = async args => {
    const fetchedEvent = await Event.findOne( { _id : args.eventId } );
    const booking = new Booking( {
        user : '62a621c18ab3cf5b8b2104b6',
        event : fetchedEvent
    } );
    const result = await booking.save();
    return transformBooking( result );
};
const cancelBooking = async args => {
    try {
        const booking = await Booking.findById( args.bookingId ).populate( 'event' );
        const event = transformEvent( booking.event );
        await Booking.deleteOne( { _id : args.bookingId } );
        return event;
    } catch ( err ) {
        throw err;
    }
};
module.exports = {
    bookings,
    bookEvent,
    cancelBooking
}