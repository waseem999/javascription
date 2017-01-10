import React, { Component } from 'react';
import axios from 'axios';

export default class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            roast: '',
            region: '',
            description: '',
            photo: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event){
        axios({method: 'post', url: '/api/coffee/new', data:{
            name: this.state.name,
            roast: this.state.roast,
            region: this.state.region,
            description: this.state.description,
            photo: this.state.photo
        }})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    render(props){
        return (
            <form onSubmit={this.handleSubmit}>
                <input name='name' value={this.state.name} placeholder="Name" onChange={this.handleChange}/>
                <input name='roast' value={this.state.roast} placeholder="Roast" onChange={this.handleChange}/>
                <input name='region' value={this.state.region} placeholder="Region" onChange={this.handleChange}/>
                <textarea name='description' 
                    value={this.state.description} 
                    placeholder="Description" 
                    onChange={this.handleChange} 
                    rows="5" cols="50"
                    />
                <input name='photo' value={this.state.photo} placeholder="Photo URL" onChange={this.handleChange}/>
                <button type="submit" onSubmit={this.handleSubmit} >Submit Coffee</button>
            </form>
        );
    }
}