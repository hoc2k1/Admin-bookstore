import React from 'react'
import NavBar from '../components/navbar/navbar'
import Header from '../components/header/header';
import Loading from '../components/loading/loading';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  showLoading(data) {
    this.setState({loading: data})
  }
  renderContent() {
    return (
      <div></div>
    )
  }
  render() {
    return (
      <div className='w-100 h-100 overflow-hidden d-flex flex-column'>
        <Header history={this.props.history}/>
        <div className="d-flex flex-grow-1 overflow-hidden">
          <NavBar history={this.props.history} />
          <div className='flex-grow-1'>
            {(this.state.loading) ? (<Loading />) : this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

export default BaseContainer