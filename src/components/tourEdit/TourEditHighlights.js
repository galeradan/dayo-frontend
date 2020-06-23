import React from 'react'

const TourEditHighlights =({tid, defaultHighlights, onAddHighlight, onDeleteHighlight})=>{

	const [highlight, setHighlight] = React.useState('');

	let newHighlight = {
		description: highlight,
		tid: tid 
	}
	

	
	return(
			  <div className="form-row py-2 justify-content-center">
			      <div className="form-group col-md-12 mb-2">
			  		<label htmlFor="highlight" className="font-weight-bold">Highlights</label>
			  		<div className="input-group flex-nowrap">
			  		    <input 
			  		    	id="highlight" 
			  		    	type="text" 
			  		    	placeholder="What are the highlights of this tour?" 
			  		    	className="form-control"
							onChange={(e)=>setHighlight(e.target.value)}
			  		    	/>
			  		  <div className="input-group-append">
			  		    <button className="btn btn-primary" onClick={()=>onAddHighlight(newHighlight)}>Add</button>
			  		  </div>
			  		</div>
			      </div>
			      <div className="col-md-12 d-flex justify-content-center flex-wrap">
			      	{

			      	 defaultHighlights.map((one)=>{
			         	return (
			         			<div key={one.id}className="card highlight d-flex flex-row align-items-center justify-content-center">
			         				<small className="pl-2">{one.description}</small>
			         				<button 
			         					className="btnHighlight btn py-0 px-2"
			         					onClick={()=>{onDeleteHighlight(one.id, one.tid)}}
			         					>
			         					<small>X</small>
			         				</button>
			         			</div>
			         		   )
			      	 })
			      	}
			         
			      </div>
			  </div>
		);
}

export default TourEditHighlights;