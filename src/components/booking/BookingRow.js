import React from 'react'

const BookingRow =({booking, onCancelBooking, onConfirmBooking})=>{
	
	// console.log(booking)

	return (
    		<tr>
    			<td>
                    <p>{booking.package.title}</p>
                    <small>Reference: {String(booking.reference).toUpperCase()}</small>
                </td>
    			<td>
    				<p>Php {booking.total}</p>
    				<small>{booking.persons} persons</small>
    			</td>
    			<td>{booking.date}</td>
    			<td>
    				<p>{booking.user.name}</p>
    				<small>{booking.user.email}</small>
    			</td>
    			<td>{booking.isConfirmed}</td>
    				{
    					booking.isConfirmed!=="Cancelled" && booking.isConfirmed!=="Completed"? 
    					<td className="text-right">
    						<button className="btn btn-primary mr-2" onClick={()=>{onConfirmBooking(booking.id, booking.tid)}}>Complete</button>
    						<button className="btn btn-danger" onClick={()=>{onCancelBooking(booking.id, booking.tid)}}>Cancel</button>
    						
    				
    				
    					</td>: 
    					<td className="text-right">
    						<small>No action needed</small>
    					</td>
    			}
    		</tr>
		);


}

export default BookingRow;