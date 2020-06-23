import React from 'react'
// import cover1 from '../../assets/images/sec-cover1.jpg';
import {NavLink} from 'react-router-dom'

const TourCard =({tour})=>{
	return(


			    	<div className="col-md-3 card-tour d-flex align-items-stretch">
				       <NavLink to={`/tour/view/${tour.id}`}>
							<div className="card h-100">
								<img src={tour.cover.url} alt="" className="card-img-top card-tour-img"/>
							  <div className="card-body">
							    <h5 className="card-title">{tour.title}</h5>
							    <p>
							      {tour.description}
							    </p>
							  </div>
							  <div className="card-footer">
								 <p>
								   Php {tour.price}
								 </p>
								 <small className="text-muted">- Published by: {tour.creator.name}</small>
							  </div>
							</div>
				       </NavLink>
			       </div>
			
		);
}

export default TourCard;