import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

export class HomeComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      jokes: jokeArr,
    }
    this.footStyle = {
      position: 'absolute',
      bottom: '0px'
    }
    this.joke = this.randJoke()
    this.randJoke = this.randJoke.bind(this);
  }

  randJoke(){
    return this.state.jokes[Math.floor((Math.random()*1000) % this.state.jokes.length)]
  }

  render(props){
    return (
            <div style={{minHeight: '91vh', paddingBottom: '2em'}}>
                <div>
                    <img src="/main_logo.svg" alt="javaScript(ion)"/>
                </div>
                <div>
                    <div>
                        <h3>Welcome to javaScript(ion)! We deliver your favorite coffee directly to your door or office every morning just the way you like it! Sign up to create a custom coffee subscription package built just for you.</h3>
                    </div>
                </div>
                    <div>
                        <Link to='/subscriptions' >View our subscription plans</Link>
                    </div>
                    <div>
                        <Link to='/signup' >Sign up for coffee delivery!</Link>
                    </div>
                    <div>
                        <Link to='/success' >Hear what our happy customers have to say</Link>
                    </div>
                <div style={this.footStyle}>
                    <h4>{this.joke}</h4>
                </div>
            </div>
    )
  }
}

const mapStateToProps = function(state, ownProps){
  return {
    state: state
  }
}

const mapDispatchToProps = function(dispatch){
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

const jokeArr = [
  'Q: What do you call a cow who\'s just given birth? A: De-calf-inated!',
  'Q: Why is a bad cup of coffee the end of a marriage? A: Because it\'s GROUNDS for divorce!',
  'Q: What is best Beatles song? A: Latte Be!',
  'Q: What do you call sad coffee? A: Despresso.',
  'Q: What kind of coffee was served on the Titanic A: Sanka',
  'Q: Why do I not like hot drinks? A: It\'s just not my cup of tea.',
  'Q: What\'s fat, hairy and drinks a lot of coffee? A: Java the Hut!',
  'Q: How do you make Pig Jerky? A: Give them some coffee.',
  'Q: What\'s the opposite of coffee? A: Sneezy.',
  'Q: What do you call a baby calf that\'s lost his head? A: De-calf',
  'Q: What do you call Java that won\'t stop brewing? A: Stand your ground coffee.',
  'Q: Where does birds go for coffee? A: a NESTcafe',
  'javaScript(ion) or Victoria Secrets?.....Who charges more per cup?',
  'Ever notice that when you serve someone a cold cup of coffee, it makes them boiling mad?',
  'The worst part of waking up (from a nap), is Folgers in your lap!',
  'There are two types of people in this world: People who love javaScript(ion) and liars.',
  'The coffee tasted like dirt because it was ground a couple of minutes ago.',
  'A man went to his psychiatrist and said, \'Every time I drink my coffee, I get a stabbing pain in my right eye,\' The psychiatrist said, \'well, have you tried taking the spoon out?\''
];
