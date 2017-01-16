import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCoffeesCreator} from '../reducers/changeselectedcoffee.jsx';


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

        this.handleCoffeeClick = this.handleClick.bind(this);
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
            coffees[`tier${coffee.tier}`].push(coffee);
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
        let selectedTier = 'tier' + tier
        for(let i=0; i<this.state[selectedTier].length;i++){
            if(this.state[selectedTier].name === name){
                return this.state[selectedTier][i]
            }
        }
    }

    handleCoffeeClick(e){
        let selectedCoffee = this.findCoffee(e.name, e.tier);
        axios({method: 'put', url:'/api/subscription/coffees', data:{
            coffees: selectedCoffee
        }})
        .then(coffee =>{
            this.props.changeSelectedCoffees(coffee);
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
            <div>
                <div>
                    <select name="filter" id="filter" value={this.state.filter} onChange={this.filterChange}>
                        <option value="all">All</option>
                        <option value="1">Tier 1</option>
                        <option value="2">Tier 2</option>
                        <option value="3">Tier 3</option>
                    </select>
                </div>
                {   this.state.filter === 'all' || this.state.filter === '1' ?
                    <div>
                    <h3>Tier 1 Coffees. $1/cup $15/lb</h3>
                    {
                        this.state.allCoffees.tier1.map(function(coffee){
                            return (
                                <span key={coffee.name}>
                                    <div>
                                        <img src={`${coffee.photo}`} alt="Tier 1 coffee"/>
                                    </div>
                                    <div>
                                        <span>{coffee.name}</span>
                                    </div>
                                    <div>
                                        <button name={coffee.name} tier={coffee.tier} onClick={this.handleCoffeeClick}>Add to Subscription</button>
                                    </div>
                                </span>
                            )
                        })
                    }
                    </div>
                    :
                    null
                }
                {   this.state.filter === 'all' || this.state.filter === '2' ?
                    <div>
                        <h3>Tier 2 Coffees. $2.50/cup $25/lb</h3>
                    {
                        this.state.allCoffees.tier2.map(function(coffee){
                            return (
                                <span key={coffee.name}>
                                    <div>
                                        <img src={`${coffee.photo}`} alt="Tier 2 coffee"/>
                                    </div>
                                    <div>
                                        <span>{coffee.name}</span>
                                    </div>
                                    <div>
                                        <button name={coffee.name} tier={coffee.tier} onClick={this.handleCoffeeClick}>Add to Subscription</button>
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
                    <div>
                        <h3>Tier 3 Coffees. $4/cup $35/lb</h3>
                    {
                        this.state.allCoffees.tier3.map(function(coffee){
                            return (
                                <span key={coffee.name}>
                                    <div>
                                        <img src={`${coffee.photo}`} alt="Tier 3 coffee"/>
                                    </div>
                                    <div>
                                        <span>{coffee.name}</span>
                                    </div>
                                    <div>
                                        <button name={coffee.name} tier={coffee.tier} onClick={this.handleCoffeeClick}>Add to Subscription</button>
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