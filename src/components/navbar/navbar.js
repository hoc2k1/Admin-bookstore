import React, { useState } from 'react'
import { URL_BE, navBarMenu } from '../../constants/values'
import { checkNotEmpty } from '../../config/identify'

const NavBar = (props) => {
  let activeLv1 = ''
  let activeLv2 = ''
  navBarMenu.map((item) => {
    if (checkNotEmpty(item.childrens)) {
      const checkActiveItem = item.childrens.filter((item1) => (item1.url == props.history.location.pathname || `${item1.url}/` == props.history.location.pathname))
      if (checkActiveItem && checkActiveItem[0]) {
        activeLv2 = checkActiveItem[0].key
        activeLv1= item.key
      }
    }
    else if (item.url == props.history.location.pathname || `${item.url}/` == props.history.location.pathname) {
      activeLv1 = item.key
    }
  })
  const [openLv2, setOpenLv2] = useState(activeLv1)
  const openPage = (url) => {
    props.history.push(url)
  }
  const renderContentNavbar = () => {
    return (
      <div>
        {navBarMenu.map((item,index) => {
          return (
            <div key={`nav-item-lv1-${index}`} className='border-bottom'>
              <div 
                onClick={() => {
                  if (!checkNotEmpty(item.childrens)) {
                    openPage(item.url)
                  }
                  else if (openLv2 != item.key) {
                    setOpenLv2(item.key)
                  }
                  else if (openLv2 == item.key) {
                    setOpenLv2('')
                  }
                }}
                className={`d-flex cursor-pointer justify-content-between align-items-center navbar-item ${activeLv1 != item.key ? '' : 'active'}`}
              >
                <span className={`heading ${activeLv1 != item.key ? 'fw-normal' : ''}`}>{item.title}</span>
                {checkNotEmpty(item.childrens) && (<i className={`fa fa-chevron-down icon-rotate ${openLv2 == item.key ? 'animation-rotate' : ''}`}></i>)}
              </div>
              {checkNotEmpty(item.childrens) && (
                <div className={`${openLv2 == item.key ? 'show' : ''} list-nav-bar-lv2 px-2`}>
                  {item.childrens.map((item2, index2) => {
                    return (
                      <div key={`nav-item-lv2-${index2}`} className={`${(index2 != item.childrens.length - 1) ? 'border-bottom' : ''}`}>
                        <div 
                          onClick={() => {
                            openPage(item2.url)
                          }}
                          className={`navbar-item ${activeLv2 != item2.key ? 'cursor-pointer' : 'active cursor-not-allowed'}`}
                        >
                          <span className={`heading-small ${activeLv2 != item2.key ? 'fw-normal' : ''}`}>{item2.title}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }
  if (props.isDrawer) {
    return (
      <div className='overflow-auto h-100 py-3 px-2'>
        {renderContentNavbar()}
      </div>
    )
  }
  else {
    return (
      <div className='navbar-container shadow overflow-auto flex-column d-none d-md-flex'>
        {renderContentNavbar()}
      </div>
    )
  }
}
export default NavBar