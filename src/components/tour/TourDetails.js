import React from 'react'
import TourHighlights from './TourHighlights'
import DatePicker from 'react-datepicker'
import { addDays, addMonths, format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const TourTitle =({tour, onBooking})=>{

	const [startDate, setStartDate] = React.useState(addDays(new Date(),7));
	const [pax, setPax] = React.useState(1);
	const [total, setTotal] = React.useState(tour.price*pax);
	
	React.useEffect(()=>{
		setTotal(tour.price*pax)
	},[pax,tour])
	
	// console.log(tour)
	

	let newPackage = {
		title: tour.title,
		description: tour.description,
		price: tour.price,
		pax: tour.pax,
		cid: tour.cover.id,
		isPublished: tour.isPublished,
		tid: tour.id,
		url: tour.cover.url
	}
	
	let newBooking = {
		date: format(startDate, "yyyy-MM-dd"),
		persons: parseInt(pax),
		total: parseFloat(total),
		tid: tour.id,
		creatorId: tour.creator.id
	}

	return(
			<section className="container section-below pt-5 pb-5">
			  <div className="row justify-content-center">
			      <div className="col-md-10">
			         <h2>{tour.title}</h2>
			         <small className="text-muted">- Published by: {tour.creator.name}</small>
			       	 <hr/>
			      </div>
			      <div className="col-md-10">
			         <TourHighlights highlights={tour.highlights}/>
			      </div>
			      <div className="col-md-10 pb-3">
			         <h4 className="mb-2">Description</h4>
			         <p>
			         	{tour.description}
			         </p>
			      </div>
			       <div className="col-md-10">
			         
			                  <div id="/book" className="card overview-card">
			                  	<div className="card-header">
			                  		<div className="form-row">
			         					<div className="col-md-10">
			         						<h4 className="d-inline">PHP: {tour.price}</h4><small>/pax</small>
			         						<p>Max of {tour.pax} {tour.pax > 1 ? <span>persons</span> : <span>person</span>}</p>
			         					</div>
			                  		</div>
			                  	</div>
			                  	<div className="card-body">
			                  		<div className="form-row align-items-center">
			                  			<div className="form-group col-lg-6 text-center">
											<label htmlFor="datepick" className="d-block">Booking date</label>
											<small>Earliest booking date is {format(addDays(new Date(),7), "MMMM dd, yyyy")}</small>
											<DatePicker
												  // selected={startDate}
											      onChange={date => setStartDate(date)}
											      minDate={addDays(new Date(),7)}
											      maxDate={addMonths(new Date(), 3)}
											      className="form-control"
											      inline

											    />
			                  			</div>
			                  			<div className="form-group col-lg-4">
			                  				<h6 className="mb-2">Selected date is {format(startDate, "MMMM dd, yyyy")}</h6>
											<label htmlFor="paxNum">Number of persons</label>
											<input 
												value={pax}
												onChange={e => setPax(e.target.value)}
												id="paxNum" 
												min={1} 
												max={12}
												type="number" 
												className="form-control"/>
											<label htmlFor="paxNum" className="">Total</label>
		                  					<h4 className="total p-2">PHP: {total}</h4><small></small>
		                  					<button 
		                  						className="btn btn-block btn-primary mt-2"
		                  						onClick={()=>{onBooking(newBooking, newPackage)}}
		                  						>Book Now</button>
			                  			</div>
			                  		</div>
			                  	</div>
			                  </div>
			      </div>
			  </div>
			</section>
		);
}

export default TourTitle;