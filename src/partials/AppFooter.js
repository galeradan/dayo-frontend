import React from 'react'

const AppFooter =()=>{
	return(
			<footer className="mt-auto">
			  <div className="container-fluid py-3 font-neutralw">
			    <div className="row justify-content-center font-neutralw">

			      <div className="col-md-4">
			        <h6 className="footer-h6"><strong>About DAYO</strong></h6>
			        <p className="mb-2">
			          <small className="footer-small">DAYO is a booking system that aims to help local guides and tour organizers to recover from the effects of the pandemic</small>
			        </p>

			         <small><strong>Contacts</strong></small>
			         <p><small className="footer-small">Email: support@dayo.com</small></p>
			         <p><small className="footer-small">Phone: 09092636332</small></p>

			      </div>

			  
			     
			      <div className="col-md-4">
			        <h6 className="footer-h6"><strong>Content disclaimer</strong></h6>
			        <p className="mb-0">
			          <small className="footer-small">
			            This website is for educational purposes only and not for commercial use. The images are from free sites like unsplash.
			          </small>
			        </p>
			      </div>

			      
			    </div>
			  </div>
			</footer>

		);
}

export default AppFooter;