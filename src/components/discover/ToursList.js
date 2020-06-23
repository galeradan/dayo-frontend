import React from 'react'
import TourCard from './TourCard'
// import cover1 from '../../assets/images/sec-cover1.jpg';

const ToursList =({tours})=>{

	let loading = true;

	if(tours!==undefined){
		loading=false
	}


	return(

			<React.Fragment>
					 <section className="container pt-5">
					    <h4>Popular Tours</h4>
					    <hr/>
					    <div className="row">
					    	{

								loading ? <h6 className="text-center">Loading...</h6>  :

									tours.length!==0? tours.map((tour)=>{
									
									return <TourCard key={tour.id} tour={tour}/>  
								}) : 
									<div className="col-md-12 mb-5">
										<h6>Sadly, no available tours today... Please come back later</h6>
									</div>
					    	}
					    </div>
					</section>

			</React.Fragment>
			
		);
}

export default ToursList;