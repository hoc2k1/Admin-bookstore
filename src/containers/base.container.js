import React from 'react'
import NavBar from '../components/navbar/navbar'
import Header from '../components/header/header';
import Loading from '../components/loading/loading';
import { inputStatus } from '../constants/values';

class BaseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.isEdit = false
    this.state = {
      loading: true,
      form: {
        values: {},
        checkValidate: [],
        buttonStatus: false
      },
      showModal: false
    }
    this.form=[]
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeField = this.onChangeField.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
    this.onClickAdd = this.onClickAdd.bind(this)
    this.onClickButton = this.onClickButton.bind(this)
  }
  componentWillMount() {
    this.form.map((item) => {
      this.state.form.values[item.inputKey] = ''
      if (item.isValidate) {
        this.state.form.checkValidate[item.inputKey] = inputStatus.normal
      }
    })
  }
  onChangeField(inputKey, text, newInputStatus) {
    const newFormState = this.state.form;
    newFormState.values[inputKey] = text;
    newFormState.checkValidate[inputKey] = newInputStatus;
    let checkButtonStatus = true

    this.form.map((item) => {
      if (item.isValidate && newFormState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newFormState.checkValidate[item.inputKey] == inputStatus.normal && this.state.form.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newFormState.buttonStatus = checkButtonStatus
    this.setState({form: newFormState})
  }
  showLoading(data) {
    this.setState({loading: data})
  }
  onClickEdit (data) {
    const newFormState = this.state.form
    this.isEdit = true
    newFormState.values['id'] = data._id
    this.form.map((item) => {
      newFormState.values[item.inputKey] = data[item.inputKey]
      if (item.isValidate) {
        newFormState.checkValidate[item.inputKey] = inputStatus.normal
      }
    })

    let checkButtonStatus = true
    this.form.map((item) => {
      if (item.isValidate && newFormState.checkValidate[item.inputKey] != inputStatus.success) {
        if (!(newFormState.checkValidate[item.inputKey] == inputStatus.normal && newFormState.values[item.inputKey])) {
          checkButtonStatus = false
        }
      }
    })
    newFormState.buttonStatus = checkButtonStatus

    this.setState({form: newFormState, showModal: true})
  }
  onClickAdd () {
    const newFormState = this.state.form
    this.isEdit = false
    this.form.map((item) => {
      newFormState.values[item.inputKey] = ''
      if (item.isValidate) {
        newFormState.checkValidate[item.inputKey] = inputStatus.normal
      }
    })

    newFormState.buttonStatus = false
    this.setState({form: newFormState, showModal: true})
  }
  onClickButton() {
    if(this.isEdit) {
      this.onEdit()
    }
    else {
      this.onAdd()
    }
  }
  onSubmit() {

  } 
  onAdd() {

  }
  onEdit() {
    
  }
  onRemove() {

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