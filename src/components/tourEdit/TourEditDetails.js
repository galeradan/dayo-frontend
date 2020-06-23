import React from 'react'
import TourEditHighlights from './TourEditHighlights'

const TourEditTitle =({details, tourHighlights, onUpdateDetails, onPublishTour, onAddHighlight, onDeleteHighlight})=>{

	const [newTitle, setNewTitle] = React.useState(details.title)
	const [newPrice, setNewPrice] = React.useState(details.price)
	const [newPax, setNewPax] = React.useState(details.pax)
	const [newDescription, setNewDescription] = React.useState(details.description)
	
	

	let newTourDetails = {
		id: details.id,
		title: newTitle,
		price: parseInt(newPrice),
		pax: parseInt(newPax),
		description: newDescription,
	}
	
	// const addHighlight =(newHighlight)=>{
	// 	setNewHighlights([...newHighlights, newHighlight])
	// }

	return(
			<section className="container pt-5 pb-5">
			  <div className="row justify-content-center">
			      <div className="col-md-8">
					{
						details.isPublished? 
							<span></span>:
							<div className="card overview-card mb-3">
								<div className="card-body d-flex justify-content-between align-items-center">
									<p>This is a draft version. <strong>Publish</strong> to make it discoverable</p>
									<div className="form-group m-0">
										<button onClick={()=>onPublishTour(details.id, newTourDetails)}className="btn btn-success mr-2">Publish</button>
									 </div>  
								</div>
							</div>	


					}
			      	

			      	<h3>General Information</h3>
			      	<hr/>
				      	 <div className="form-group">
							<label htmlFor="title" className="font-weight-bold">Title</label>
				 			<input 
				 				value={newTitle===" "?'':newTitle}
				 				onChange={(e)=>{setNewTitle(e.target.value)}}
							  	id="title"
							  	type="text" 
							  	placeholder="What is the title of your tour?"
							  	className="form-control"/>
				      	 </div>
				      	 <div className="form-row">
			      			<div className="form-group col-md-6">
								<label htmlFor="price" className="font-weight-bold">Pricing</label>
								<input 
									value={newPrice}
									onChange={(e)=>{setNewPrice(e.target.value)}}
									id="price" 
									type="number" 
									className="form-control"/>
			      			</div>
			      			<div className="form-group col-md-6">
								<label htmlFor="pax" className="font-weight-bold">Maximum Persons</label>
								<input 
									value={newPax}
									onChange={(e)=>{setNewPax(e.target.value)}}
									id="pax"
									type="number"
									className="form-control"/>
			      			</div>	      	
				      	 </div>
		      			
		      			 <div className="form-group">
		      				<label htmlFor="desc" className="font-weight-bold">Description</label>
		      				<textarea 
		      					value={newDescription===" "?'':newDescription}
		      					onChange={(e)=>{setNewDescription(e.target.value)}}
		      					name="desc" 
		      					id="desc" 
		      					cols="30" 
		      					rows="5" 
		      					placeholder="type something here..." 
		      					className="form-control">
		      				</textarea>
		      			 </div>  
		      			 <div className="form-group text-right">
		      				<button className="btn btn-primary" onClick={()=>{onUpdateDetails(newTourDetails)}}>Save Details</button>
		      			 </div> 
		      		<h3 className="mt-5">Additional Information</h3>
		      		<hr/> 
				      	 <TourEditHighlights 
				      	 	tid={details.id} 
				      	 	onAddHighlight={onAddHighlight} 
				      	 	onDeleteHighlight={onDeleteHighlight} 
				      	 	defaultHighlights={tourHighlights}
				      	 	/>
		      			 
					      
			      </div>
			  </div>
			</section>
		);
}

export default TourEditTitle;