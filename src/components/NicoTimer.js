import React from 'react';
import moment from 'moment';

class NicoTimer extends React.Component {
  state = {
    date : moment()
  }
  constructor(props) {
    super(props);
  } 

  componentDidMount = () => {
    this.updateTimer();
  }

  updateTimer = () => {
    this.setState(() => ({ date : moment()}));
    setTimeout(this.updateTimer, 100);
  }

  render = () =>  {
    return (
      <div>
        { this.state.date.valueOf()} - {this.state.date.format('LL LTS:SSS') }     
      </div>
    ) 
  }
}

export default NicoTimer;
