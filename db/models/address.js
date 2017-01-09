const Sequelize = require('sequelize')
const db = require('APP/db')

const addressSchema = {
    streetaddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    unitnumber: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zipcode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        defaultValue: "USA"
    },
    security: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    comments: {
        type: Sequelize.TEXT
    },
    deliverycontactnumber: {
        type: Sequelize.STRING
    },
    deliverycontactname: {
        type: Sequelize.STRING
    },
    deliveryaddresstype: {
        type: Sequelize.ENUM('home', 'business')
    }
}

const Address = db.define('address', addressSchema, {});

module.exports = Address;