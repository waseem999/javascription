import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import AccessDenied from './accessdenied.jsx';
import {browserHistory} from 'react-router';

export class AddProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      roast: '',
      region: '',
      description: '',
      photo: '',
      tier: ''
    }
    this.formStyle = {
      width: '100%',
      margin: '5px 0px 5px 0px'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    let newCoffee = {
      name: this.state.name,
      roast: this.state.roast,
      region: this.state.region,
      description: this.state.description,
      photo: this.state.photo,
      tier: +this.state.tier
    }
    axios.post("/api/coffee/new", newCoffee)
      .then(result => browserHistory.push('/subscriptions'))
      .catch(err => console.log(err))
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  render(){
    return (
        <div style={{height: '100vh', textAlign: 'center'}}>
          <h2 style={{textDecoration: 'underline'}}>Please add a coffee</h2>
          {
            this.props.admin === 'administrator' ?
            <div style={{width: '50%', margin: 'auto'}}>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input style={this.formStyle} name='name' value={this.state.name} placeholder="Name" onChange={this.handleChange}/>
                </div>
                <div>
                  <input style={this.formStyle} name='roast' value={this.state.roast} placeholder="Roast" onChange={this.handleChange}/>
                </div>
                <div>
                  <input style={this.formStyle} name='region' value={this.state.region} placeholder="Region" onChange={this.handleChange}/>
                </div>
                <div>
                  <input style={this.formStyle} name='tier' value={this.state.tier} placeholder="Tier" onChange={this.handleChange}/>
                </div>
                <div >
                  <textarea name='description'
                      style={this.formStyle}
                      value={this.state.description}
                      placeholder="Description"
                      onChange={this.handleChange}
                      rows="5" cols="50"
                      />
                </div>
                <div>
                  <input style={this.formStyle} name='photo' value={this.state.photo} placeholder="Photo URL" onChange={this.handleChange}/>
                </div>
                  <button type="submit" className='btn btn-success' onSubmit={this.handleSubmit} >Submit Coffee</button>
              </form>
            </div>
              :
              <AccessDenied />
          }
        </div>
    )
  }
}

const mapStateToProps = function(state, ownProps){
  if(state.auth){
    return {
      admin: state.auth.account_type
    }
  }
  return {
    admin: null
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
