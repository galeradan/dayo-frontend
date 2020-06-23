import React from 'react'
import { useHistory } from 'react-router-dom'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getToursQuery, getCreatorToursQuery, getPublishedToursQuery} from '../gql/queries'
import {addCoverMutation, addTourMutation, deleteTourMutation, deleteCoverMutation} from '../gql/mutations'

import ToursTable from '../components/manage/ToursTable'

import swal from 'sweetalert';

const ManagePage =(props)=>{
	let navbar = props.innerRef
	let history = useHistory()
	const user = props.user()
	// let getTours = ''
	const [isAuth, setIsAuth] = React.useState(false)
	const [authUser, setAuthUser] = React.useState(user)
	
	let getTours = props.getCreatorToursQuery.creatorTours
	
	React.useEffect(()=>{
		if (authUser!==undefined) {
				setIsAuth(true)
			if(authUser.role===1){
				setAuthUser(user)
			}else{
				setIsAuth(false)
				history.push(`/discover`)
			}
		}else{
			setIsAuth(false)
			history.push(`/discover`)
		}

	},[authUser]) // eslint-disable-line react-hooks/exhaustive-deps
	
	
	// console.log(getTours)
	const [tours, setTours] = React.useState([])
	
	const [redirect, setRedirect] = React.useState(false)
	const [tourId, setTourId] = React.useState(null)
	

	React.useEffect(()=>{
		if (isAuth) {
			navbar.current.classList.remove('nav-transparent')
			navbar.current.classList.remove('nav-account')
			navbar.current.classList.add('nav-light')
		}
	},[isAuth]) // eslint-disable-line react-hooks/exhaustive-deps

	let defaultCover = {
		url:'https://via.placeholder.com/720',
		vertical: 50,
	}

	const newTour=()=>{

		swal({
		  title: "Are you sure?",
		  text: "Do you really want to create a new Tour Package?",
		  icon: "info",
		  buttons: ["Back", "Create a new tour"],
		  dangerMode: false,
		})
		.then((willAdd) => {
		  if (willAdd) {
		    props.addCoverMutation({
		    	variables: defaultCover,
		    }).then((res)=>{
		    	let defaultTour = {
		    		title: " ",
		    		description: " ",
		    		price: parseFloat(0.00),
		    		pax: parseInt(0),
		    		cid: res.data.addCover.id,
		    		creatorId: user.id
		    	}
		    	// console.log(defaultTour)
		    	props.addTourMutation({
		    		variables: defaultTour,
		    		refetchQueries: [
		    						{
		    						 query: getCreatorToursQuery,
		    						 variables:{
		    								creatorId: user.id
		    							}
		    						}
		    						]
		    	}).then((res)=>{
		    		setTourId(res.data.addTour.id)
		    	}).then(res =>{
		    			swal("Sucessfully Created!", "Redirecting to edit page", {
		    			  icon: "success",
		    			  buttons: false,
		    			  timer: 2000,
		    			}).then((res)=>{
		    				setRedirect(true)
		    			})
		    		})	
		    })
		  } else {
		    swal("Aborted!","Didn't create a new tour package.");
		  }
		});


		
	}

	const deleteTour=(id,cid)=>{

		swal({
		  title: "Are you sure?",
		  text: "Once deleted, you will not be able to recover this tour!",
		  icon: "warning",
		  buttons: ["Back","Proceed deleting tour"],
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
		    props.deleteTourMutation({
		    	variables: {id: id},
		    	refetchQueries: [
		    						{
		    							query: getCreatorToursQuery,
		    							variables:{
		    								creatorId: user.id
		    							}
		    						},
		    						{
		    							query: getPublishedToursQuery
		    						}
		    					]
		    }).then((res)=>{
		    			swal("Sucessfully Deleted!", {
		    			  icon: "success",
		    			  buttons: false,
		    			  timer: 3000,
		    			})
		    })
		  } else {
		    swal("Aborted!","Didn't delete the selected tour package.");
		  }
		});

		

		

	}

	React.useEffect(()=>{
		if (redirect) {
			history.push(`/tour/edit/${tourId}`)
		}
	}, [tourId,redirect,history])

	React.useEffect(()=>{
		setTours(getTours)
	}, [getTours,tours])
	
	return(
			<React.Fragment>
			{
				isAuth? 
					<div className="container after-nav pt-5 pb-5">
						<h3>Manage Tours</h3>
						<hr/>
						<button onClick={newTour} className="btn btn-primary">Create a Tour</button>
						{ tours!==undefined? <ToursTable deleteTour={deleteTour} tours={tours}/> : <h6 className="mt-4">Loading List..</h6>}
					</div> :
					<p>Prohibited</p>
			}
				
				
			</React.Fragment>
			

		);
}

export default compose(
					graphql(getToursQuery, 
							{name: 'getToursQuery'}),
					graphql(getCreatorToursQuery, {
							skip: (props)=> props.user === undefined,
							options: (props)=>{
								const user = props.user()
								let id = ''
								if(user!==undefined){
									id = user.id
								}
								return {
									variables: {
										creatorId: id
									}
								}
							},
							name: "getCreatorToursQuery"
						}),
					graphql(addCoverMutation, 
							{name: 'addCoverMutation'}),
					graphql(addTourMutation, 
							{name: 'addTourMutation'}),
					graphql(deleteTourMutation, 
							{name: 'deleteTourMutation'}),
					graphql(deleteCoverMutation, 
							{name: 'deleteCoverMutation'}),
					graphql(getPublishedToursQuery, 
							{name: 'getPublishedToursQuery'})
				)(ManagePage);