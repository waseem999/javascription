import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {removeCoffeesCreator} from '../reducers/changeselectedcoffee.jsx';



class SelectedCoffees extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: [],
            unSelected: [],
            frequency: {}
        }
        this.coffeePicStyle = {
            width: '15em'
        }
        this.selectedCoffeeStyle = {
            textAlign: 'center',
            margin: '10px'
        }
        this.handleCoffeeClick = this.handleCoffeeClick.bind(this);
        this.checkList = this.checkList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCoffeeSelect = this.handleCoffeeSelect.bind(this);
        this.getPrice = this.getPrice.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({selected: nextProps.selectedCoffees, frequency: nextProps.frequency})
    }

    handleCoffeeClick(e){
        let arrIndex = this.checkList(e.target.name, e.target.dataset.roast);
        if(!arrIndex){
            this.setState({selected: [...this.state.selected, e.target.dataset.coffee]})
        }else{
            let newArr = this.state.selected;
            newArr = newArr.splice(arrIndex, 1);
            this.setState({selected: newArr});
        }
    }

    reconcileLists(){
        let newSelected = [...this.state.selected];
        for(let i=0; i<this.state.unSelected.length; i++){
            for(let j=0; j<newSelected.length; j++){
                if(newSelected[j].name === this.state.unSelected[i]){
                    newSelected.splice(j,1)
                    j--;
                }
            }
        }
        return newSelected;  
    }

    handleSubmit(){
        let newSelected = this.reconcileLists();
        axios({method: 'post', url:`/api/subscription/coffees`, data:{
            coffees: newSelected
        }})
        .then(subs =>{
            this.props.changeSelectedCoffees(newSelected);
        })
        .catch(err => {
            console.log("ERROR in selected coffee submit", err.status, err);
        })
    }

    checkList(name){
        for(let i=0; i < this.state.unSelected.length; i++){
            if(this.state.unSelected[i] === name){
                return i;
            }
        }
        return false;
    }

    handleCoffeeSelect(e){
        let check = this.checkList(e.currentTarget.name);
        if(typeof check === 'number'){
            let newArr = [...this.state.unSelected];
            newArr.splice(check, 1);
            this.setState({unSelected: newArr});
        }else{
            this.setState({unSelected: [...this.state.unSelected, e.currentTarget.name]})
            
        }
    }

    getPrice(){
        let price = 0;
        let freq = Object.values(this.state.frequency)
        freq = freq.filter(function(day){
            return day
        }).length;
        for(let i=0; i<this.state.selected.length; i++){
            if(this.state.selected[i].tier_id === 1){
                price+=1;
            }else if(this.state.selected[i].tier_id === 2){
                price+=2.5;
            }else{
                price+=4;
            }
        }
        price = price * freq * 4;
        return price;
    }

    render(props){
        return (
            <div style={this.selectedCoffeeStyle}>
                <h3 style={{textDecoration: 'underline'}}>Your Selected Coffees</h3>
                <h4>${this.getPrice()} per month (4 weeks)</h4>
                {
                    !!this.state.selected.length ?
                    this.state.selected.map((coffee) => {
                        return (
                            <span key={`${coffee.name}${coffee.roast}`}>
                                <button onClick={this.handleCoffeeSelect} name={coffee.name} data-roast={coffee.roast} data-coffee={coffee}>
                                    <div style={
                                        !!this.state.unSelected.includes(coffee.name) ?
                                        {backgroundColor: 'red'}
                                        :
                                        {backgroundColor: ''}
                                    }>
                                        <div>
                                            <img style={this.coffeePicStyle} src={coffee.photo} alt="Java"/>
                                        </div>
                                        <div>
                                            <span>{coffee.name}</span>
                                        </div>
                                        <div>
                                            <span>Roast: </span>
                                            <span>{coffee.roast.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </button>
                            </span>
                        )
                    })
                    :
                    <span>Select some delicious coffees!</span>
                }
                { !!this.state.selected.length ? 
                    <div>
                        <button onClick={this.handleSubmit} >Remove Selections</button>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}


const mapStateToProps = function(state, ownProps){
    return {
        selectedCoffees: state.selectedCoffees,
        frequency: state.subscription.selecteddays
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        changeSelectedCoffees: bindActionCreators(removeCoffeesCreator, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCoffees);