import React from 'react'
import {NavLink} from 'react-router-dom'

const TourRow = ({tour, deleteTour})=>{
	return(
		<tr>
			<td>{tour.title}</td>
			<td>{tour.price}</td>
			{tour.isPublished? <td>Published</td> : <td>Draft</td>}
			<td className="text-right">
				<NavLink to={`/tour/edit/${tour.id}`} className="btn btn-warning mr-2">Update</NavLink>
				<button onClick={()=>{deleteTour(tour.id,tour.cover.id)}} className="btn btn-danger">Delete</button>
			</td>
		</tr>

		);
}

export default TourRow;