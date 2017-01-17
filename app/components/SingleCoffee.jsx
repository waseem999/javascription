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

export const SingleCoffee = ({coffee}) => {
  return (
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
  );
}

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function mapStateToProps(state){
  return {
    user: state.auth,
  }
}

function mapDispatchToProps(dispatch){
  return {}
}

export default connect (mapStateToProps, mapDispatchToProps)(SingleCoffee)