import React from 'react'
import swal from 'sweetalert';

const BookingCard =({booking, onCancelBooking})=>{
	
	const onViewDetails =()=>{
		swal({
		  title: "Description",
		  text: `${booking.package.description}`,
		  button: "Got it!",
		});
	}

	return (
    		<div className="col-md-4 card-tour d-flex align-items-stretch">
				<div className="card h-100">
				  <div className="card-header">
				 	<h6>{booking.isConfirmed}</h6>

				  </div>
				  <div className="card-body">
				    <h5 className="card-title">{booking.package.title}</h5>
				 	<p><strong>Reference:</strong> {String(booking.reference).toUpperCase()}</p>
				 	<p><strong>Date:</strong> {booking.date}</p>
				 	<p><strong>Amount: Php</strong> {booking.total} for {booking.persons}</p>
				  </div>
				  <img src={booking.package.url} alt="" className="card-img card-booking-img"/>
				  <div className="card-footer text-right">
				  	<div className="form-group">
					  	<button className="btn btn-primary" onClick={onViewDetails}>More Details</button>
						{booking.isConfirmed==="Scheduled"? <button className="btn btn-danger ml-1" onClick={()=>{onCancelBooking(booking.id,booking.tid)}}>Cancel</button>: ''}

				  	</div>
				  </div>
				</div>
       		</div>
		);


}

export default BookingCard;