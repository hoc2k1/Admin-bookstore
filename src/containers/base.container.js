import React from 'react'
import NavBar from '../components/navbar/navbar'
import Header from '../components/header/header';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  renderContent() {
    return (
      <div>
        
      </div>
    )
  }
  render() {
    return (
      <div className='w-100 h-100 overflow-hidden d-flex flex-column'>
        <Header history={this.props.history}/>
        <div className="d-flex flex-grow-1">
          <NavBar history={this.props.history} />
          <div className='flex-grow-1 p-md-3 p-2 overflow-auto'>
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default BaseContainer