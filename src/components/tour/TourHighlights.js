import React from 'react'

const TourHighlights =({highlights})=>{

	return(
			<section className="container px-0">
			  <h4>Highlights</h4>
			  <div className="row py-2">
			      <div className="col-md-12 d-flex">
			      	 {
			      	 	highlights.map((highlight)=>{
			      	 		return  <small key={highlight.id} className="highlight text-center font-light">{highlight.description}</small>
			      	 	})
			      	 }
			      </div>
			  </div>
			</section>
		);
}

export default TourHighlights;