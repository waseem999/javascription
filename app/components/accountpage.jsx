import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class AccountPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
            name: '',
            email: '',
            phonenumber: '',

        }
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
            {
                this.props.state.auth ? 
                <div>
                    <h3>Welcome Back!</h3>
                </div>
                :
                <div>
                    <div>
                        <span>You need to be logged in to see this information.  If you have an account, please </span>
                        <Link to="/login" >Login</Link>
                    </div>
                    <div>
                        <span> Or if you are new, please </span>
                        <Link to="/signup" >Signup</Link>
                    </div>
                </div>
            }
            </div>
        )
    }
}



const mapStateToProps = function(state, ownProps){
    return {
        state
    }
}

const mapDispatchToProps = function(dispatch){
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);