import React from 'react'

const SearchSection =()=>{
	return(
			<section className="container-fluid section">
			  <div className="row">
			      <div className="col-md-12 d-flex justify-content-center">
			          <div className="card search-card">
			            <div className="card-body">
			                <div className="input-group flex-nowrap">
			                    <input type="text" className="form-control" placeholder="Search places..."/>
			                  <div className="input-group-append">
			                    <button className="btn btn-primary">Search</button>
			                  </div>
			                </div>
			            </div>
			          </div>
			      </div>
			  </div>
			</section>
		);
}

export default SearchSection;