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
    if (imageTypes.includes(file?.type)) {
      return true
    } else {
      return false
    }
  }

  const validate = (image, newInputStatus) => {
    if(checkIfImage(image)) {
      const newImages = value
      newImages.push(image)
      onChange(inputKey, newImages, newInputStatus)
    }
    else {
      toast.error("Hãy chọn hình ảnh!")
    }
  }
  const removeImage = (image) => {
    const newImages = value
    let index = '';
    if (image.type) {
      index = newImages.findIndex(item => item.name === image.name);
    }
    else {
      index = newImages.findIndex(item => item == image)
    }
    if (index !== -1) {
      newImages.splice(index, 1);
    }
    onChange(inputKey, newImages, true)
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
      <div className="d-flex flex-wrap">
        {value && value.map((item, index) =>
          <div key={`image-${index}`} className="position-relative h-fit w-fit">
            <img 
              src={item.type ? URL.createObjectURL(item) : item} 
              alt="Image" 
              className="image-in-grid m-2"
            />
            <i className="fa fa-times-circle cursor-pointer position-absolute top-0 right-0" onClick={()=> removeImage(item)}></i>
          </div>
        )}
      </div>
      <span className={`input-message-error ${checkValidate == inputStatus.error ? 'show' : '' }`}>{errorMessage || 'Error message'}</span>
    </div>
  )
}

export default ImagePickerInput