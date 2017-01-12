'use strict';

const db = require('APP/db')
const models = require('APP/db/models')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', phone_number: 8005555555, password: '1234', account_type: 'customer', address: {
        street_address: 'ljsdf Dr.', unit_number: '11', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "i am god give me coffee", delivery_contact_number: '312456789', delivery_contact_name: "Yaweh", delivery_address_type: 'business'
      }, subscription: {
        frequency: [true, false, true, false, true, true, false], completed: true
      }},
  {name: 'Barack Obama', email: 'barack@example.gov', phone_number: 8005555555, account_type: 'administrator', password: '5678', address: {
        street_address: 'Trump House Dr.', unit_number: '0', city: 'Washington D.C.', state: 'DC', zipcode: '99999', comments: "get me outta here", delivery_contact_number: '312456789', delivery_contact_name: "Michelle", delivery_address_type: 'business', security: true
      }, subscription: {
        frequency: [false, true, true, true, true, true, false], completed: true
      }},
  {name: 'Hal Carleton', email: 'Hal@javaScription.com', phone_number: 1234567890, account_type: 'administrator', password: 'comet', address: {
        street_address: '123 Coffee drive', unit_number: '100', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "wake me up before you go go", delivery_contact_number: '312456789', delivery_contact_name: "Hal", delivery_address_type: 'business'
      }, subscription: {
        frequency: [false, false, true, true, true, false, false], completed: true
      }},
  {name: 'Alan Herman', email: 'Herm@javaScription.com', phone_number: 0987654321, account_type: 'administrator', password: 'idontdrinkcoffee', address: {
        street_address: '988 Coca-Cola lane', unit_number: '1000000000', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "cafeine", delivery_contact_number: '312456789', delivery_contact_name: "Alan", delivery_address_type: 'home'
      }, subscription: {
        frequency: [true, false, true, true, true, true, false], completed: true
      }},
  {name: 'Waseem Karim', email: 'Waseem@javaScription.com', phone_number: 800123456, account_type: 'administrator', password: 'ilovecoffee', address: {
        street_address: '12 merchandise lane', unit_number: '1871', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "talk to zeke", delivery_contact_number: '312456789', delivery_contact_name: "Zeke", delivery_address_type: 'business'
      }, subscription: {
        frequency: [false, false, true, false, false, true, false], completed: true
      }},
  {name: 'Danielle Katz', email: 'Katz@javaScription.com', phone_number: 312456789, account_type: 'administrator', password: 'ialsolovecoffee', 
    address: {
        street_address: '123 1871 Dr.', unit_number: '1', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "just kick down the door", delivery_contact_number: '312456789', delivery_contact_name: "Danielle", delivery_address_type: 'business'
      }, subscription: {
        frequency: [false, false, true, true, true, true, false], completed: true
      }},

  ], user => db.model('users').create(user, {include:[{model: models.Address, as: 'address'}, {model: models.Subscription, as: 'subscription'}]}))

const seedTiers = () => db.Promise.map([
  {name: 'Good', description: 'This is our base coffee.  Its super tasty and super cheap!!! Almost like dirt!', costpercup: 100, costperpound: 1500, 
    product: [{
      roast: 'dark', name: "Danielle's Dark", region: 'Antarctica', description: 'Wing picked by penguins who are paid a slaves wage!  Extra flavor added by deisel leaks from our 70 year old supertanker.'
      },
      {roast: 'extra dark', name: "Alan's Dirt", region: 'Sahara desert', description: 'Our coffee is grown in one of the driest, hottest, most inhospitable place in the world.  This gives our coffee extra flavor because the beans lack proper hydration.  Also, you can still taste the sand, which is awesome!'},
      {roast: 'light', name: "Waseem's Worst", region: "Macedonia", description: "This coffee is almost as fake as the news that our 16 year old internet trolls make up.  You'll love the fake taste and fake smell!"}
    ]
  }
], user => models.tier.create())



db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => {
    console.log(`Seeded ${users.length} users OK____________________>>>>>>>>>>>>>>>>>>>>>>>`)
  })
  .catch(error => console.error(error))
  .finally(() => db.close())
