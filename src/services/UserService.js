'use strict';
const { Service } = require( '../../system/services/Service' );
const autoBind = require( 'auto-bind' );

class UserService extends Service {
    constructor( model ) {
        super( model );
        this.model = model;
        autoBind( this );
    }

    async register( data ) {
        try {
            return await super.insert( data );
        } catch ( error ) {
            throw error;
        }
    }   

    /**
     *
     * @param email : string
     * @param includePassword : boolean
     * @returns {Promise<*>}
     */
    async findByEmail( email, includePassword = false ) {
        return includePassword ? this.model.findByEmail( email ).select( '+password' ) : this.model.findByEmail( email );
    }
}

module.exports = { UserService };
