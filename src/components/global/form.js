import React from 'react'
import Button from './button'
import FloatingInput from './floating.input'
import ImagePickerInput from './imagePickerInput'

const Form = (props) => {
  return (
    <div className='login-form'>
      {props.form.map((item, index) => {
        if(item.type == 'image') {
          return (
            <ImagePickerInput
              {...item}
              key={`login-${index}`}
              value={props.stateForm.values[item.inputKey]}
              checkValidate={props.stateForm.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)}
            />
          )
        }
        else {
          return (
            <FloatingInput
              {...item}
              key={`login-${index}`}
              value={props.stateForm.values[item.inputKey]}
              checkValidate={props.stateForm.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)} 
            />
          )
        }
      })}
      <Button buttonStatus={props.stateForm.buttonStatus} onClick={() => props.onClickButton()}>
        <span className="heading">Lưu thông tin</span>
      </Button>
    </div>
  )
}

export default Form