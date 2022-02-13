import React from 'react';

export default function Search () {
  return (
    <div className="Search">
      <form>
        <div className="row">
          <div className="col-8">
          <input
            type="search"
            placeholder="enter a city..."
            className="form-control"
          />
          </div>
          <div className="col-4">
            <input
              className="btn btn-primary"
              type="submit"
              value="search"
            />
          </div>
        </div>
      </form>
    </div>
  )
}