import React from 'react'
import TourRow from './TourRow'

const TourTable = ({tours, deleteTour})=>{

	const [search, setSearch] = React.useState('')
	const [filteredTours, setFilteredTours] = React.useState([])
	
	// console.log(tours)

	React.useEffect(()=>{
		const foundTours=tours.filter(tour=>{
					return tour.title.toLowerCase().includes(search.toLowerCase())
				})
		setFilteredTours(foundTours)
	},[search, tours])

	return(
			<div className="card mt-3">
				<input onChange={(e)=>{setSearch(e.target.value)}} type="text" className="form-control mt-2" placeholder="Search Tour title here"/>
				<div className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Title</th>
								<th scope="col">Price</th>
								<th scope="col">Status</th>
								<th scope="col" className="text-right">Manage</th>
							</tr>
						</thead>
						<tbody>
							{
								filteredTours.map((tour)=>{
									return <TourRow key={tour.id} deleteTour={deleteTour} tour={tour}/>
								})
							}
						</tbody>
					</table>
				</div>
				
			</div>
			

		);
}

export default TourTable;