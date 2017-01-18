import React, { Component } from 'react';
import {connect} from 'react-redux';

export class Quote extends Component {
  constructor(props){
    super(props);
    this.state = { 
    }
  }

  render(){
    let quotes = this.props.quotes;
    return (
            <div>
              <div style={{textAlign : "center" } }>
               <table className="table table-striped" width="647">
                <tbody>
                    { 
                    quotes[0] && quotes.map((quote, i )=> (
                        <tr>
                          <td key={i}>
                              <span><b><i>{quote.quote}</i></b></span>
                          </td>
                          <td>-{quote.user.name}</td>
                        </tr>
                    ))
                    }
                </tbody>
              </table>
            </div>
          </div>
    )
  }
}

function mapStateToProps(state){
    console.log("STATE", state)
  return {
     quotes : state.Quotes.Quotes
  }
}

function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(Quote);
