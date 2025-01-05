import React from 'react'
import Button from './button'
import FloatingInput from './floating.input'
import ImagePickerInput from './imagePickerInput'
import ImagesPickerInput from './imagesPickerInput'
import { InputPicker } from 'rsuite'
import { checkNotEmpty } from '../../config/identify'
import TextareaInput from './textarea.input'
import { inputStatus } from '../../constants/values'

const Form = (props) => {
  return (
    <div className='login-form'>
      {props.form.map((item, index) => {
        if(item.type == 'image') {
          return (
            <ImagePickerInput
              {...item}
              key={`${index}`}
              value={props.stateForm.values[item.inputKey]}
              checkValidate={props.stateForm.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)}
            />
          )
        }
        else if (item.type == 'images') {
          return (
            <ImagesPickerInput
              {...item}
              key={`${index}`}
              value={props.stateForm.values[item.inputKey]}
              checkValidate={props.stateForm.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)}
            />
          )
        }
        else if (item.type == 'textarea') {
          return (
            <TextareaInput
              {...item}
              key={`${index}`}
              value={props.stateForm.values[item.inputKey]}
              checkValidate={props.stateForm.checkValidate[item.inputKey]}
              onChange={(inputKey, text, newInputStatus) => props.onChangeField(inputKey, text, newInputStatus)} 
            />
          )
        }
        else if (item.type == 'picker') {
          return (
            <div className="d-flex flex-column normal-width-input mt-2" key={`${index}`}>
            {item.label && (<label className={`${item.required ? 'required' : ''}`}>{item.label}</label>)}
            
            <InputPicker
              placeholder={item.placeholder}
              disabled={!checkNotEmpty(props.stateForm.data[item.inputKey]) || item.disabled}
              data={props.stateForm.data[item.inputKey]}
              defaultValue={props.stateForm.values[item.inputKey]}
              onChange={(value) => props.onChangeField(item.inputKey, value, inputStatus.success)}
              cleanable={false}
            />
            <span className={`input-message-error`}>Error message</span>
          </div>
          )
        }
        else {
          return (
            <FloatingInput
              {...item}
              key={`${index}`}
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