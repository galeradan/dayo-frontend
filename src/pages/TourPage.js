import React from 'react'

// Components
import CoverDiv from '../components/CoverDiv'
import TourDetails from '../components/tour/TourDetails'

import { useHistory } from 'react-router-dom'

// Resources
// import cover from '../assets/images/sec-cover1.jpg';

// GraphQL & Apollo boost
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'
import {getTourQuery, getUserBookingsQuery, getPublishedToursQuery} from '../gql/queries'
import {addBookingMutation, addPackageMutation, unavailableTourMutation} from '../gql/mutations'

import swal from 'sweetalert';

const TourPage =(props)=>{
	// let y=50;
	let history = useHistory();
	const getNavbar = props.innerRef;
	const getTour = props.getTourQuery.tour
	const user = props.user()
	
	const [navbar, setNavbar] = React.useState()
	
	const [tour, setTour] = React.useState({})
	const [loading,setLoading] = React.useState(true)
	// const [processing, setProcessing] = React.useState(false)

	React.useEffect(()=>{
		if (getTour !== undefined) {
			setTour(getTour)
			setNavbar(getNavbar)
			setLoading(false)
		}
	},[getNavbar,getTour])
	
	const onBooking =(newBooking, newPackage)=>{
		console.log({newBooking, newPackage})
		let pax = newBooking.persons
		let startDate = newBooking.date

		


		if(user!==undefined){
			if(user.role!==1){
				if (startDate !== '' && pax > 0 && pax <= tour.pax) {
					swal({
					  title: "Are you sure?",
					  text: "Click Continue to proceed to booking process",
					  icon: "info",
					  buttons: ["Cancel","Continue Booking"],
					  dangerMode: false,
					})
					.then((willDelete) => {
					  if (willDelete) {
					   let reference = Math.random().toString(36).substring(30, 4)	
					   props.unavailableTourMutation({
					   		variables:{
					   			id: newBooking.tid
					   		},
					   		refetchQueries: [
							    				{
							    					query: getPublishedToursQuery
							    				}
		    								]
					   })
					   props.addPackageMutation({
					   	variables: newPackage
					   }).then((res)=>{
					   		let pid = res.data.addPackage.id
					   		props.addBookingMutation({
					   			variables: {
					   				 date: newBooking.date,
					   			     persons: newBooking.persons,
					   			     total: newBooking.total,
					   			     isConfirmed: "Scheduled",
					   			     pid: pid,
					   			     tid: newBooking.tid,
					   			     uid: user.id,
					   			     isResponded: false,
					   			     reference: reference,
					   			     creatorId: newBooking.creatorId
					   			},
					   			refetchQueries:[
					   							{
					   							query: getUserBookingsQuery,
					   							variables: {
					   								uid: user.id
					   							 }
					   							},
					   						   ]
					   		}).then((res)=>{
					   			swal("Booking Successful!", "Please wait for the confirmation of the Organizer",{
					   			  icon: "success",
					   			  buttons: false,
					   			  timer: 3000,
					   			}).then(()=>{
					   				history.push(`/bookings/${user.id}`)
					   			})
					   		})
					   })
					  } else {
					    swal("Did not proceed to booking.");
					  }
					});
				}else{
				  	swal("Prohibited", "Details should be within allowed range", {
				  				  icon: "error",
				  				  buttons: false,
				  				})
				}
				
			}else{
				swal("Prohibited", "A Creator account is not allowed to book", {
					  			  icon: "error",
					  			  buttons: false,
					  			})
			}
		}else{
			swal("Prohibited", "Please login to make a booking", {
						  icon: "error",
						  buttons: false,
						})
		}
	}

	return(
			<React.Fragment>

				{

					loading? <span>Loading...</span> : 
					<React.Fragment> 
						<CoverDiv nav={navbar} cover={tour.cover.url} y={tour.cover.vertical}/>
						<TourDetails 
							tour={tour}
							onBooking={onBooking}
							/>
					</React.Fragment>
				}
				
			</React.Fragment>
			
			

		);
}

export default compose(
						graphql(getTourQuery, {
							options: (props)=>{
								return {
									variables: {
										id: props.match.params.tid
									}
								}
							},
							name: "getTourQuery"
						}),
						graphql(getUserBookingsQuery, {
							skip: (props)=> props.user === undefined,
							options: (props)=>{
								const user = props.user()
								let id = ''
								if(user!==undefined){
									id = user.id
								}
								return {
									variables: {
										uid: id
									}
								}
							},
							name: "getUserBookingsQuery"
						}),
						graphql(addPackageMutation, 
								{name: 'addPackageMutation'}),
						graphql(addBookingMutation, 
								{name: 'addBookingMutation'}),
						graphql(unavailableTourMutation, 
								{name: 'unavailableTourMutation'}),
						graphql(getPublishedToursQuery, 
								{name: 'getPublishedToursQuery'}),

						)(TourPage);
 



					