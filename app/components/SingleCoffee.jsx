import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
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

  render(){
    return (
      <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Single Coffee"
        >
        <div>
          <h3>coffee.name</h3>
          <p>
          <strong>Region: </strong>
          coffee.region
          </p>
          <p>
          <strong>Roast: </strong>
          coffee.roast
          </p>
          <p>
          <strong>Description: </strong>
          coffee.description
          </p>
          <button type="submit" className="btn btn-primary">Add to Subscription</button>
        </div>
      </Modal>
    );
  }
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
    actions: bindActionCreators({showCoffeeModal, hideCoffeeModal, getCoffee}, dispatch)
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(SingleCoffee)