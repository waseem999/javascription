'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')

const subscriptionSchema = {
  frequency: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [false, false, false, false, false, false, false],
    validate: {
      hasLengthOf : function(val){
        if (val.length !== 7) throw new Error(`array length not valid. Expected length of 7.  Instead got length of ${val.length}`);
      }
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
};

const subscriptionMethods = {
  getterMethods : {
    frequencyObject : function(){
      return {
        Sunday : this.frequency[0],
        Monday : this.frequency[1],
        Tuesday: this.frequency[2],
        Wednesday : this.frequency[3],
        Thursday : this.frequency[4],
        Friday : this.frequency[5],
        Saturday : this.frequency[6]
      };
    }
  },    
  
  setterMethods: {
    frequencyObject: function (frequencyobj) {
      const frequencyarray = [frequencyobj["Sunday"], frequencyobj["Monday"], frequencyobj["Tuesday"], frequencyobj["Wednesday"], frequencyobj["Thursday"], frequencyobj["Friday"], frequencyobj["Saturday"]]
      this.setDataValue('frequency', frequencyarray);
    }
  },
  
}

const Subscription = db.define('subscription', subscriptionSchema, subscriptionMethods);

module.exports = Subscription;
