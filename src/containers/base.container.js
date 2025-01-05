import React from 'react'
import NavBar from '../components/navbar/navbar'
import Header from '../components/header/header';
import Loading from '../components/loading/loading';
import { inputStatus } from '../constants/values';
import CustomModal from '../components/global/custom.modal';
import Button from '../components/global/button'

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
      showModal: false,
      showModalDelete: false,
      searchText: '',
      searchType: '',
      page: 1
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
    this.onSearch = this.onSearch.bind(this)
    const queryParams = new URLSearchParams(this.props.location.search);
    this.state.searchText = queryParams.get('searchText') ? decodeURI(queryParams.get('searchText')) : '';
    this.state.searchType = queryParams.get('searchType') ? decodeURI(queryParams.get('searchType')) : '';
    this.state.page = queryParams.get('page') || 1;
  }
  componentWillMount() {
    this.form.map((item) => {
      this.state.form.values[item.inputKey] = item.defaultValue
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
      newFormState.values[item.inputKey] = item.defaultValue
      if (item.isValidate) {
        newFormState.checkValidate[item.inputKey] = inputStatus.normal
      }
    })

    newFormState.buttonStatus = false
    this.setState({form: newFormState, showModal: true})
  }
  onClickRemove (data) {  
    this.state.form.values['id'] = data._id;
    this.setState({ showModalDelete: true })
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
  onSearch() {
    if(this.state.searchType) {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `?searchText=${this.state.searchText}&searchType=${this.state.searchType}`
      })
    }
    else {
      this.props.history.push({
        pathname: this.props.location.pathname,
        search: `?searchText=${this.state.searchText}`
      })
    }
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
        <CustomModal closeModal={() => this.setState({showModalDelete: false})} showModal={this.state.showModalDelete}>
          <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-4 gap-md-3'>
            <div className=''>
              <span className='heading-large'>Bạn có muốn xóa không?</span>
            </div>
            <div className='d-flex gap-md-3 gap-3'>
              <Button buttonStatus={true} customButton={"bg-transparent border color-text"} onClick={() => this.setState({showModalDelete: false})}>
                <span className="heading">Không</span>
              </Button>
              <Button buttonStatus={true} onClick={() => this.onRemove()}>
                <span className="heading">Có</span>
              </Button>
            </div>
          </div>
        </CustomModal>
      </div>
    )
  }
}

export default BaseContainer