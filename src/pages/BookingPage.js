import React from 'react'
import { useHistory } from 'react-router-dom'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getUserBookingsQuery, getCreatorBookingsQuery, getPublishedToursQuery} from '../gql/queries'
import {cancelBookingMutation, confirmBookingMutation, availableTourMutation} from '../gql/mutations'

import DatePicker from 'react-datepicker'
import { addMonths, format } from "date-fns";

import BookingCard from '../components/booking/BookingCard'
import BookingRow from '../components/booking/BookingRow'


import swal from 'sweetalert';

const BookingPage =(props)=>{

	let navbar = props.innerRef
	let history = useHistory()
	const user = props.user()
	const getUserBooking = props.getUserBookingsQuery.userBookings
	const getCreatorBooking = props.getCreatorBookingsQuery.bookings
	// console.log(props)

	
	
	const [bookings, setBookings] = React.useState([])
	const [creatorBookings, setCreatorBookings] = React.useState([])
	const [loading,setLoading] = React.useState(true)

	React.useEffect(()=>{
		if (getUserBooking !== undefined && getCreatorBooking !== undefined ) {
			setBookings(getUserBooking)
			setCreatorBookings(getCreatorBooking)
			setLoading(false)
		}
	},[getUserBooking,loading, getCreatorBooking])

	// const [isAuth, setIsAuth] = React.useState(false)
	const [authUser, setAuthUser] = React.useState(user)
	
	React.useEffect(()=>{
		if (authUser!==undefined) {
			// setIsAuth(true)
			setAuthUser(user)
		}else{
			// setIsAuth(false)
			history.push(`/discover`)
		}

	},[authUser]) // eslint-disable-line react-hooks/exhaustive-deps

	const [loaded, setLoaded] = React.useState(false)

	React.useEffect(()=>{
		navbar.current.classList.remove('nav-transparent')
		navbar.current.classList.remove('nav-account')
		navbar.current.classList.add('nav-light')
		setLoaded(true)
	},[loaded,navbar])



	const onCancelBooking=(id,tid)=>{
		// console.log(id)

		swal({
		  title: "Are you sure?",
		  text: "Once cancelled, you can not turn it back anymore",
		  icon: "warning",
		  buttons: ["Back","Proceed"],
		  dangerMode: true,
		})
		.then((willCancel) => {
		  if (willCancel) {
		   		props.cancelBookingMutation({
		   			variables: {id: id},
		   			refetchQueries: [
		   								{
		   									query: getUserBookingsQuery,
		   									variables: {
		   										uid: user.id
		   									}
		   								},
		   								{
		   									query: getCreatorBookingsQuery,
		   									variables: {
		   										creatorId: user.id
		   									}
		   								}
		   							]
		   		}).then((res)=>{
						
						props.availableTourMutation({
							variables: {
								id: tid
							},
							refetchQueries: [
												{
													query: getPublishedToursQuery
												}
											]
						}).then((res)=>{
							swal("Booking Cancelled", "The booking is successfully cancelled.", {
							  icon: "success",
							  buttons: false,
							  timer: 1000,
							})

						})

		   				
		   		})
		  } else {
		    swal("Aborted!","The booking remains untouched.");
		  }
		});


		
	}

	const onConfirmBooking=(id, tid)=>{
		// console.log(id)
		swal({
		  title: "Are you sure?",
		  text: "Once confirmed, you will not be able to revert it back",
		  icon: "info",
		  buttons: ["Back","Confirm Booking"],
		  dangerMode: false,
		})
		.then((willConfirm) => {
		  if (willConfirm) {
		    props.confirmBookingMutation({
		    			variables: {id: id},
		    			refetchQueries: [
		    								{
		    									query: getUserBookingsQuery,
		    									variables: {
		    										uid: user.id
		    									}
		    								},
		    								{
		    									query: getCreatorBookingsQuery,
		    									variables: {
		    										creatorId: user.id
		    									}
		    								}
		    							]
		    		}).then((res)=>{


		    				props.availableTourMutation({
		    					variables: {
		    						id: tid
		    					},
		    					refetchQueries: [
		    										{
		    											query: getPublishedToursQuery
		    										}
		    									]
		    				}).then((res)=>{
		    					swal("Booking Completed", "The booking is successfully completed.", {
		    					  icon: "success",
		    					  buttons: false,
		    					  timer: 1000,
		    					})
		    				})
		    				
		    		})
		  } else {
		    swal("Aborted!","The booking remains untouched");
		  }
		});
		
	}



	const [search, setSearch] = React.useState('')
	const [filteredCreatorBookings, setFilteredCreatorBookings] = React.useState([])
	
	const [startDate, setStartDate] = React.useState(new Date());
	const [reset, setReset] = React.useState(true);

	

	React.useEffect(()=>{
		const foundCreatorBookings=creatorBookings.filter(creatorBooking=>{
					return creatorBooking.date.includes(format(startDate, "yyyy-MM-dd"))
				})
		setFilteredCreatorBookings(foundCreatorBookings)
		setReset(false)
	},[startDate, creatorBookings, reset])

	React.useEffect(()=>{
		const foundCreatorBookings=creatorBookings.filter(creatorBooking=>{
					return creatorBooking.reference.toLowerCase().includes(search.toLowerCase())
				})
		setFilteredCreatorBookings(foundCreatorBookings)
				setReset(false)

	},[search, creatorBookings, reset])

	const onResetFilters =()=>{
		setReset(true)
		setSearch('')
	}
	
	return(
			<React.Fragment>
						<div className="container after-nav pt-5">
							<h3>Bookings</h3>
							<p>Manage your bookings here</p>
							<hr/>	
						</div>
				{
					authUser!==undefined?
						
							user.role!==1? 
								 <section className="container pt-2 pb-5">
								    <div className="row">
								    	{
								    		loading? 
								    			<div className="col-md-12">
								    				<h6 className="text-center">  Loading...</h6>  
								    			</div>:
									    		
									    			bookings.map((booking)=>{
									    				return <BookingCard 
									    							key={booking.id} 
									    							booking={booking} 
									    							onCancelBooking={onCancelBooking}
									    							/>
									    			})
									    		
								    	}
								    	
								    </div>
								</section> :
								<section className="container vh-90 pt-2 pb-5">
								    <div className="card mt-3">
								    	<div className="form-row">
									    	<div className="form-group col-md-2 pt-2 mb-0">
												<DatePicker
													  selected={startDate}
												      onChange={date => setStartDate(date)}
												      minDate={new Date()}
												      maxDate={addMonths(new Date(), 3)}
												      placeholderText="Select a date"
												      className="form-control"
												    />
									    	</div>
									    	<div className="form-group col-md-8 mb-0">
												<input
													type="text" 
													value={search}
													onChange={(e)=>setSearch(e.target.value)}
													className="form-control mt-2"
													placeholder="Search booking reference here"/>
									    	</div>
							    	    	<div className="form-group col-md-2 pt-2 mb-0">
							    				<button
													className="btn btn-block btn-primary"
													onClick={onResetFilters}
							    					>
							    					Reset Search
							    				</button>
							    	    	</div>
									    	
								    	</div>
								    	
								    	
								    	<div className="table-responsive">
								    		<table className="table">
								    			<thead>
								    				<tr>
								    					<th scope="col">Title</th>
								    					<th scope="col">Total</th>
								    					<th scope="col">Date</th>
								    					<th scope="col">Email</th>
								    					<th scope="col">Status</th>
								    					<th scope="col" className="text-right">Manage</th>
								    				</tr>
								    			</thead>
								    			<tbody>
								    			{
								    				loading? 
								    					<tr>
								    						<td colSpan="6">
								    							<h6 className="text-center mt-2">Loading...</h6>  
								    							
								    						</td>
								    						
								    					</tr>:
								    				filteredCreatorBookings.map((cBooking)=>{
								    					return <BookingRow 
								    							key={cBooking.id} 
								    							booking={cBooking} 
								    							onCancelBooking={onCancelBooking}
								    							onConfirmBooking={onConfirmBooking}
								    							/>
								    				})
								    			}	
								    			</tbody>
								    		</table>
								    	</div>
								    	
								    </div>
								</section>

						:
						<p>Prohibited</p>
				}
					
					 
			</React.Fragment>
		);
}

export default compose( graphql(getUserBookingsQuery, {
							options: (props)=>{
								return {
									variables: {
										uid: props.match.params.uid
									}
								}
							},
							name: "getUserBookingsQuery"
						}),
						graphql(getCreatorBookingsQuery, {
													options: (props)=>{
														return {
															variables: {
																creatorId: props.match.params.uid
															}
														}
													},
													name: "getCreatorBookingsQuery"
												}),
						graphql(cancelBookingMutation, 
								{name: 'cancelBookingMutation'}),
						graphql(confirmBookingMutation, 
								{name: 'confirmBookingMutation'}),
						graphql(availableTourMutation, 
								{name: 'availableTourMutation'}),
						graphql(getPublishedToursQuery, 
								{name: 'getPublishedToursQuery'})
						
						)(BookingPage);