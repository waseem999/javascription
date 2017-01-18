import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '55%'
  }


};

class SingleCoffee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: this.props.coffeeModalOpen
    };

    this.openModal = this.props.actions.showCoffeeModal.bind(this)
    this.closeModal = this.props.actions.hideCoffeeModal.bind(this)
  }

  // these should later be moved to action creator/reducer file


  handleCoffeeClick(e){
        let selectedCoffee = this.props.coffee
        axios({method: 'put', url:'/api/subscription/coffees', data:{
            coffees: selectedCoffee
        }})
        .then(coffee =>{
            this.props.changeSelectedCoffees([selectedCoffee]);
        })
        .catch(err => {
            console.log("ERROR in selected coffee submit", err.status, err);
        })
    }

  render(){
    return (
      <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Single Coffee"
        >
        <div>
          <h3>{this.props.coffee.name}</h3>
          <img className="coffee-pic" src={this.props.coffee.photo}/>
          <p>
          <strong>Region: </strong>
          {this.props.coffee.region}
          </p>
          <p>
          <strong>Roast: </strong>
          {this.props.coffee.roast}
          </p>
          <p>
          <strong>Description: </strong>
          {this.props.coffee.description}
          </p>
          <button type="submit" className="btn btn-primary" onClick={this.handleCoffeeClick.bind(this)}>Add to Subscription</button>
          <p></p>
          <label for="comment">Leave a Review: </label>
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Stars" aria-describedby="basic-addon1" />
            <span className="input-group-addon" id="basic-addon1">/5</span>
          </div>
          <div className="form-group">
            <textarea className="form-control" rows="1" id="comment" placeholder="Review here!"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </div>
      </Modal>
    );
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCoffeesCreator} from '../reducers/changeselectedcoffee.jsx';
import {showCoffeeModal, hideCoffeeModal, getCoffee} from 'APP/app/reducers/singleCoffee.jsx';

function mapStateToProps(state){
  return {
    user: state.auth,
    coffeeModalOpen: state.singleCoffee.coffeeModalOpen,
    coffee: state.singleCoffee.selectedCoffee
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeSelectedCoffees: bindActionCreators(addCoffeesCreator, dispatch),
    actions: bindActionCreators({showCoffeeModal, hideCoffeeModal, getCoffee}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(SingleCoffee)