const Event = require( '../../models/event' );
const User = require( '../../models/user' );
const { transformEvent } = require( './merge' );

const events = async () => {
    try {
        const events = await Event.find();
        return events?.map( event => {
            return transformEvent( event );
        } );
    } catch ( err ) {
        throw err;
    }
};
const createEvent = async (args,req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated!');
    }
    const event = new Event( {
        title : args.eventInput.title,
        description : args.eventInput.description,
        price : +args.eventInput.price,
        date : new Date( args.eventInput.date ),
        creator : '62a621c18ab3cf5b8b2104b6'
    } );
    let createdEvent;
    try {
        const result = await event.save();
        createdEvent = transformEvent( result );
        const creator = await User.findById( '62a621c18ab3cf5b8b2104b6' );

        if( !creator ) {
            throw new Error( 'User not found.' );
        }
        creator.createdEvents.push( event );
        await creator.save();

        return createdEvent;
    } catch ( err ) {
        console.log( err );
        throw err;
    }
};
module.exports = {
    events,
    createEvent
}