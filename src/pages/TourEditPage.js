import React from 'react'

// Components
import CoverDivEdit from '../components/tourEdit/CoverDivEdit'
import TourEditDetails from '../components/tourEdit/TourEditDetails'
import { useHistory } from 'react-router-dom'

// import TourItinerary from '../components/tour/TourItinerary'

// GraphQL ApolloBoost Dependencies

import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getTourQuery,getPublishedToursQuery} from '../gql/queries'

import {
		updateTourMutation, 
		updateCoverMutation, 
		publishTourMutation,
		addHighlightMutation,
		deleteHighlightMutation
	} from '../gql/mutations'


import swal from 'sweetalert';

const TourEditPage =(props)=>{
	const navbar = props.innerRef;
	const getTour = props.getTourQuery.tour
	let history = useHistory()
	const user = props.user()

	const [tour, setTour] = React.useState({})
	const [loading,setLoading] = React.useState(true)
	

	// const [isAuth, setIsAuth] = React.useState(false)
	const [authUser, setAuthUser] = React.useState(user)

	React.useEffect(()=>{
		if (authUser!==undefined) {
				// setIsAuth(true)
			if(authUser.role===1){
				setAuthUser(user)
			}else{
				// setIsAuth(false)
			}
		}else{
			// setIsAuth(false)
			history.push(`/discover`)
		}
	},[]) // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(()=>{
		if (getTour !== undefined) {
			setTour(getTour)
			setLoading(false)
		}
	},[getTour, tour])
	// let tourDetails = {
	// 	id: Math.random(),
	// 	title: '',
	// 	price: 0.00,
	// 	pax: 0,
	// 	description: '',
	// }

	// let tourHighlights = [];
	
	// let tourCover = {
	// 	url: 'https://via.placeholder.com/720',
	// 	vertical: 50,
	// }

	const onUpdateCover = (newTourCover)=>{
		swal({
		  title: "Are you sure?",
		  text: "Once Confirmed, you will not be able to recover the previous cover!",
		  icon: "info",
		  buttons: ["Back","Proceed changing cover"],
		  dangerMode: false,
		})
		.then((willUpdate) => {
		  if (willUpdate) {
		    props.updateCoverMutation({
		    			variables: newTourCover,
		    			refetchQueries: [
		    				{
		    					query: getPublishedToursQuery
		    				}
		    			]
		    		}).then(res =>{
		    			swal("Cover Updated!", {
		    			  icon: "success",
		    			  buttons: false,
		    			  timer: 3000,
		    			})
		    		})
		  } else {
		    swal("Aborted!","The copy of previous cover remains, click cancel to retrieve.");
		  }
		});
		
	}

	const onUpdateDetails = (newTourDetails)=>{
		// console.log(newTourDetails);
		
		if(newTourDetails.title!==" " && newTourDetails.title!=="" && newTourDetails.price > 0 && newTourDetails.pax > 0 && newTourDetails.description!==" " && newTourDetails.description!=="" ){
			props.updateTourMutation({
				variables: newTourDetails,
				refetchQueries: [
					{
						query: getPublishedToursQuery
					}
				]
			}).then(res =>{
				swal("Tour Details Updated!", {
				  icon: "success",
				  buttons: false,
				  timer: 3000,
				})
			})
		}else{
			swal("Tour Details are not valid, Please check!", {
			  icon: "error",
			  buttons: false,
			  timer: 3000,
			})
		}

		
	}

	const onPublishTour = (id, newTourDetails)=>{

		if(newTourDetails.title!==" " && newTourDetails.title!=="" && newTourDetails.price > 0 && newTourDetails.pax > 0 && newTourDetails.description!==" " && newTourDetails.description!=="" ){
			swal({
			  title: "Are you sure?",
			  text: "Once Published, you will not be able to turn it back to draft!",
			  icon: "info",
			  buttons: ["Back","Continue publishing tour"],
			  dangerMode: false,
			})
			.then((willPublish) => {
			  if (willPublish) {
			    props.publishTourMutation({
			    	variables: {id: id},
			    	refetchQueries: [
			    		{
			    			query: getTourQuery,
			    			variables: {id:id}
			    		},
			    		{
			    			query: getPublishedToursQuery
			    		}
			    	]
			    }).then(res  =>{
			    	swal("Tour Details Updated!","Redirecting to view page", {
			    	  icon: "success",
			    	  buttons: false,
			    	  timer: 3000,
			    	}).then(()=>{
			    		history.push(`/tour/view/${id}`)
			    	})
			    })
			  } else {
			    swal("Aborted!","This tour package remains draft");
			  }
			});
		}else{
			swal("Tour Details are not valid, Please check!", {
			  icon: "error",
			  buttons: false,
			  timer: 3000,
			})
		}


		


		
	}
	
	const onAddHighlight = (newHighlight)=>{
		props.addHighlightMutation({
			variables: newHighlight,
			refetchQueries: [
				{
					query: getTourQuery,
					variables: {id:newHighlight.tid}
				},
				{
					query: getPublishedToursQuery
				}
			]
		}).then(res  =>{
			swal("Highlight added", {
			  icon: "success",
			  buttons: false,
			  timer: 1000,
			})
		})
	}

	const onDeleteHighlight =(id,tid)=>{
		props.deleteHighlightMutation({
			variables: {id: id},
			refetchQueries: [{
				query: getTourQuery,
				variables: {id:tid}
			}]
		}).then(res  =>{
			swal("Highlight deleted!", {
			  icon: "success",
			  buttons: false,
			  timer: 1000,
			})
		})
	}

	return(
			<React.Fragment>

				{
					loading? <span>loading...</span> :
					<React.Fragment>
						<CoverDivEdit 
							nav={navbar} 
							onUpdateCover={onUpdateCover} 
							id={tour.cover.id} 
							cover={tour.cover.url} 
							vertical={tour.cover.vertical}
							/>
						<TourEditDetails 
							details={tour} 
							tourHighlights={tour.highlights} 
							onUpdateDetails={onUpdateDetails}
							onPublishTour={onPublishTour}
							onAddHighlight={onAddHighlight}
							onDeleteHighlight={onDeleteHighlight}
							/> 
					</React.Fragment>
				}
				
			
			</React.Fragment>
			

		);
}

export default  compose(
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
						graphql(updateTourMutation, 
							{name: 'updateTourMutation'}),
						graphql(updateCoverMutation, 
							{name: 'updateCoverMutation'}),
						graphql(publishTourMutation, 
							{name: 'publishTourMutation'}),
						graphql(addHighlightMutation, 
							{name: 'addHighlightMutation'}),
						graphql(deleteHighlightMutation, 
							{name: 'deleteHighlightMutation'}),
						graphql(getPublishedToursQuery, 
							{name: 'getPublishedToursQuery'})
						)(TourEditPage);