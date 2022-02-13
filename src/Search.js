import React from 'react';

export default function Search () {
  return (
    <div className="Search">
      <form>
        <div className="row">
          <div className="col-9">
          <input
            type="search"
            placeholder="enter a city..."
            className="form-control"
            autoFocus="on"
          />
          </div>
          <div className="col-3">
            <input
              className="btn btn-primary w-100"
              type="submit"
              value="search"
            />
          </div>
        </div>
      </form>
    </div>
  )
}