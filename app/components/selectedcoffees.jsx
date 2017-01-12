import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import removeCoffee from '../reducers/removecoffee.jsx';


class SelectedCoffees extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: [],
        }

        this.handleClick = this.handleClick.bind(this);
        this.checkList = this.checkList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        this.setState({selected: this.props.selectedCoffees})
    }

    handleCoffeeClick(e){
        let arrIndex = this.checkList(e.name, e.roast);
        if(!arrIndex){
            this.setState({selected: [...this.state.selected, e.coffee]})
        }else{
            let newArr = this.state.selected;
            newArr = newArr.splice(arrIndex, 1);
            this.setState({selected: newArr});
        }
    }

    handleSubmit(){
        axios({method: 'put', url:'/api/subscription/coffees', data:{
            coffees: this.state.selected
        }})
        .then(newList =>{
            this.props.changeSelectedCoffees(newList);
        })
        .catch(err => {
            console.log("ERROR in selected coffee submit", err.status, err);
        })
    }

    checkList(name, roast){
        for(let i=0; i < this.state.newList.length; i++){
            if(this.state.selected[i].name === name && this.state.selected[i].roast === roast){
                return i;
            }
        }
        return null;
    }

    render(props){
        return (
            <div>
                {
                    this.props.selectedCoffees.map((coffee) => {
                        return (
                            <span key={`${coffee.name}${coffee.roast}`}>
                                <button onClick={this.handleClick} name={coffee.name} roast={coffee.roast} coffee={coffee}>
                                    <div className={
                                        !!this.checkList(coffee.name, coffee.roast) ?
                                        'unselected-coffee'
                                        :
                                        'selected-coffee'
                                    }>
                                        <div>
                                            <img src={coffee.picture} alt="Java"/>
                                        </div>
                                        <div>
                                            <span>{coffee.name}</span>
                                        </div>
                                        <div>
                                            <span>{coffee.roast}</span>
                                        </div>
                                    </div>
                                </button>
                            </span>
                        )
                    })
                }
                <button onClick={this.handleSubmit} >Save your Selections</button>
            </div>
        )
    }
}


const mapStateToProps = function(state, ownProps){
    return {
        coffees: state.auth.selectedCoffees
    }
}

const mapDispatchToProps = function(dispatch){
    return {
        changeSelectedCoffees: bindActionCreators(removeCoffee, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCoffees);