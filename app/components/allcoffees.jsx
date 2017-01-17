import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCoffeesCreator} from '../reducers/changeselectedcoffee.jsx';
import axios from 'axios';


class SelectedCoffees extends Component{
    constructor(props){
        super(props);
        this.state = {
            allCoffees: {
                tier1: [],
                tier2: [],
                tier3: []
            },
            filter: 'all'
        }
        this.coffeePicStyle = {
            width: '15em'
        }
        this.coffeeBlockStyle = {
            display: 'inline-block',
            textAlign: 'center',
            width: '16em',
            backgroundColor: '#c2c4c6',
            padding: '3px',
            border: '1px solid black',
            borderRadius: '3px',
            margin: '2px',
        }
        this.tierStyle = {
            textAlign: 'center'
        }
        this.wholeStyle = {
            backgroundColor: 'grey'
        }

        this.handleCoffeeClick = this.handleCoffeeClick.bind(this);
        this.reconcileCoffees = this.reconcileCoffees.bind(this);
        this.parseCoffees = this.parseCoffees.bind(this);
        this.findCoffee = this.findCoffee.bind(this);
        this.filterChange = this.filterChange.bind(this);
    }

    reconcileCoffees(selected, tier){
        let arr = [];
        for(let i=0; i<tier.length; i++){
            let alreadySelected = false
            for(let j=0; j<selected.length; j++){
                if(tier[i].name === selected[j].name){
                    alreadySelected = true
                }
            }
            if(!alreadySelected) arr.push(tier[i]);
        }
        return arr;
    }

    parseCoffees(allCoffees){
        let coffees = {
            tier1:[],
            tier2:[],
            tier3:[],
        }
        allCoffees.forEach(function(coffee){
            coffees[`tier${coffee.tier_id}`].push(coffee);
        });
        return coffees;
    }

    componentWillReceiveProps(nextProps){
        let all = this.parseCoffees(nextProps.allCoffees)
        const coffeeList = {
            tier1: this.reconcileCoffees(nextProps.coffees, all.tier1),
            tier2: this.reconcileCoffees(nextProps.coffees, all.tier2),
            tier3: this.reconcileCoffees(nextProps.coffees, all.tier3),
        };
        this.setState({allCoffees: coffeeList})
    }

    findCoffee(name, tier){
        let selectedTier = this.state.allCoffees[`tier${tier}`]
        for(let i=0; i<selectedTier.length;i++){
            if(selectedTier[i].name == name){
                return selectedTier[i]
            }
        }
    }

    handleCoffeeClick(e){
        let selectedCoffee = this.findCoffee(e.target.name, e.target.dataset.tier);
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

    filterChange(e){
        this.setState({filter: e.target.value});
    }


    render(props){
        return (
            <div style={this.wholeStyle}>
                <div style={{textAlign: 'center'}}>
                    <h4 style={{textDecoration: 'underline'}}>Filter Available Coffees</h4>
                    <select name="filter" id="filter" value={this.state.filter} onChange={this.filterChange}>
                        <option value="all">All</option>
                        <option value="1">Tier 1</option>
                        <option value="2">Tier 2</option>
                        <option value="3">Tier 3</option>
                    </select>
                </div>
                {   this.state.filter === 'all' || this.state.filter === '1' ?
                    <div style={this.tierStyle}>
                    <h3 style={{textAlign: 'center', textDecoration: 'underline'}}>Tier 1 Coffees. $1/cup $15/lb</h3>
                    {
                        this.state.allCoffees.tier1.map(coffee =>{
                            return (
                                <div style={this.coffeeBlockStyle} key={coffee.name}>
                                    <div >
                                        <img style={this.coffeePicStyle} src={`${coffee.photo}`} alt="Tier 1 coffee"/>
                                    </div>
                                    <div style={{width: 'auto'}}>
                                        <span >{coffee.name}</span>
                                    </div>
                                    <div>
                                        <hr style={{margin: '2px 0px 2px 0px'}}/>
                                        <button className="btn btn-success" name={coffee.name} data-tier={coffee.tier_id} onClick={this.handleCoffeeClick}>Add to Subscription</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    :
                    null
                }
                {   this.state.filter === 'all' || this.state.filter === '2' ?
                    <div style={this.tierStyle}>
                        <h3 style={{textAlign: 'center', textDecoration: 'underline'}}>Tier 2 Coffees. $2.50/cup $25/lb</h3>
                    {
                        this.state.allCoffees.tier2.map(coffee =>{
                            return (
                                <span style={this.coffeeBlockStyle} key={coffee.name}>
                                    <div>
                                        <img style={this.coffeePicStyle} src={`${coffee.photo}`} alt="Tier 2 coffee"/>
                                    </div>
                                    <div>
                                        <span>{coffee.name}</span>
                                    </div>
                                    <div>
                                        <hr style={{margin: '2px 0px 2px 0px'}}/>
                                        <button className="btn btn-success" name={coffee.name} data-tier={coffee.tier_id} onClick={this.handleCoffeeClick}>Add to Subscription</button>
                                    </div>
                                </span>
                            )
                        })
                    }
                    </div>
                    :
                    null
                }
                {   this.state.filter === 'all' || this.state.filter === '3' ?
                    <div style={this.tierStyle}> 
                        <h3 style={{textAlign: 'center', textDecoration: 'underline'}}>Tier 3 Coffees. $4/cup $35/lb</h3>
                    {
                        this.state.allCoffees.tier3.map(coffee =>{
                            return (
                                <span style={this.coffeeBlockStyle} key={coffee.name}>
                                    <div>
                                        <img style={this.coffeePicStyle} src={`${coffee.photo}`} alt="Tier 3 coffee"/>
                                    </div>
                                    <div>
                                        <span>{coffee.name}</span>
                                    </div>
                                    <div>
                                        <hr style={{margin: '2px 0px 2px 0px'}}/>
                                        <button className="btn btn-success" name={coffee.name} data-tier={coffee.tier_id} onClick={this.handleCoffeeClick}>Add to Subscription</button>
                                    </div>
                                </span>
                            )
                        })
                    }
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
        coffees: state.selectedCoffees,
        allCoffees: state.allCoffees
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        changeSelectedCoffees: bindActionCreators(addCoffeesCreator, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCoffees);