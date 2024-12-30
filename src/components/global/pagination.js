import React from "react";
import { connect } from "react-redux";

const Pagination = ({totalPage, state, history}) => {
  const renderPages = () => {
    const pages = []
    for (let i=1; i<=totalPage; i++) {
      let search = ''
      if (state.searchText) {
        search += `?searchText=${state.searchText}`
      }
      if (state.searchType) {
        search += search ? `&searchType=${state.searchType}` : `?searchType=${state.searchType}`
      }
      search += search ? `&page=${i}` : `?page=${i}`
      pages.push(
        <div key={`pagination-${i}`} className="cursor-pointer" onClick={() => history.push({pathname: history.location.pathname, search: search })}>
          <span className={`pagination-grid border-bottom ${state.page == i ? 'active' : ''}`}>{i}</span>
        </div>
      )
    }
    return pages
  }
  if (totalPage > 1) {
    return (
      <div className="content-width d-flex justify-content-center align-items-center gap-2 mt-md-3 mt-4 p-3">
        {renderPages()}
      </div>
    )
  }
  else {
    return null
  }
};

export default Pagination;
