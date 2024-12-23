import React, {useEffect} from "react";
import { inputStatus } from "../../constants/values";
import Button from "./button";
import toast from "react-hot-toast";

const ImagePickerInput = ({ 
  inputKey, placeholder, onChange, 
  value, required, label,
  errorMessage, checkValidate }) => {

  const checkIfImage = (file) =>  {
    const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (imageTypes.includes(file.type)) {
      return true
    } else {
      return false
    }
  }

  const validate = (image, newInputStatus) => {
    if(checkIfImage(image)) {
      onChange(inputKey, image, newInputStatus)
    }
    else {
      toast.error("Hãy chọn hình ảnh!")
    }
  }
  return (
    <div className="d-flex flex-column normal-width-input mt-2">
      {label && (<label className={`${required ? 'required' : ''}`}>{label}</label>)}
      <input 
        type='file'
        required={required}
        id={`file-${inputKey}`}
        className="d-none"
        onChange={(e) => {
          validate(e.target.files[0], true)
        }}
      />
      <label htmlFor={`file-${inputKey}`}>
        <Button onClick={() => {}} customButton={"w-fit my-2"}>
          <span>Chọn ảnh</span>
        </Button>
      </label>
      {value && (
        <img 
          src={value.type ? URL.createObjectURL(value) : value} 
          alt="Image" 
          className="image-picker"
        />
      )}
      <span className={`input-message-error ${checkValidate == inputStatus.error ? 'show' : '' }`}>{errorMessage || 'Error message'}</span>
    </div>
  )
}

export default ImagePickerInput