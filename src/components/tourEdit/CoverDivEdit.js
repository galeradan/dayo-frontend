import React from 'react'
// Resources
// import newImg from '../../assets/images/sec-cover1.jpg';
import moment from 'moment';
import S3 from 'react-aws-s3';
import swal from 'sweetalert';




const CoverEditDiv =({nav, onUpdateCover, id, cover, vertical, title})=>{
	
	const config = {
	    bucketName: 'dayo-imgs',
	    dirName: 'media', /* optional */
	    region: 'ap-southeast-1',
	    accessKeyId: process.env.REACT_APP_KEY,
	    secretAccessKey: process.env.REACT_APP_SECRET
	}
	const ReactS3Client = new S3(config);
	
	 
	const [file,setFile] = React.useState('')

	const [newCover, setNewCover] = React.useState(cover)
    const [newY, setY] = React.useState(vertical)
	const [loading,setLoading] = React.useState(false)


	const uploadS3 =()=>{
		
		if(file!==''){
		  const date = moment().format("YYYYMMDDhmmss")
		  const randomId = Math.random().toString(4).substring(2,7)
		  const newFileName = 'dayo-cover-'+randomId+date;
		  
		  setLoading(true)
		  ReactS3Client
		      .uploadFile(file, newFileName)
		      .then(data => {
		      	setNewCover(data.location)
		      	swal("The file has been uploaded", {
		      	  icon: "success",
		      	  buttons: false,
		      	  timer: 3000,
		      	}).then(data=>{
		      		setLoading(false)
		      	});

		      })
		      .catch(err => {
		      	alert(err)
		      	setLoading(false)
		      })
		}
		else{
			alert("Please select an image");
		}

		

	}

	const coverSection = React.useRef();
	
	const options = {
		rootMargin: "-200px 0px 0px 0px"
	};

	const observer = new IntersectionObserver((entries,observer)=>{
		entries.map((entry)=>{
			if(!entry.isIntersecting){
				nav.current.classList.remove('nav-transparent')
				nav.current.classList.remove('nav-account')
				nav.current.classList.add('nav-light')
				// console.log("Lumabas na")
			}else{
				// console.log("Bumalik")
				nav.current.classList.remove('nav-light')
				nav.current.classList.remove('nav-account')
				nav.current.classList.add('nav-transparent')
			}

			return "successful"
		})
	}, options);


	React.useEffect(()=>{
		observer.observe(coverSection.current)
		// console.log(coverSection)
	},[coverSection,observer])
    
	
	let coverStyling = {
	  backgroundImage: `linear-gradient(
	                hsla(0, 0%, 0%, .1),
	                hsla(0, 0%, 0%, .1)
	                ),
	                url(${newCover})`,
	  backgroundSize: `cover`,
	  backgroundRepeat: "no-repeat",
	  backgroundPosition: `50% ${newY}%`
	}

	let newTourCover = {
		id: id,
		url: newCover,
		vertical: parseInt(newY),
	}
	
	const resetCover =()=>{
		setNewCover(cover)
		setY(vertical)
	}


	return(	
			<React.Fragment>
						<section ref={coverSection} className="container-fluid p-0 section-cover d-flex justify-content-center align-items-center" style={coverStyling}>
							{ loading? <h6 className="font-light text-center">Loading...</h6> : ''}
			            </section>



						<section className="container-fluid section-align d-flex flex-wrap align-items-center justify-content-sm-between">
							<div className="form-group align-self-end mb-2">
								<div className="card d-flex flex-row align-items-center">
									<input
										 type="file" 
										 id="inputS3" 
										 className="ml-2" 
										 onChange={(e)=>setFile(e.target.files[0])} 
										 />
									<button className="btn btn-success" onClick={uploadS3}>Apply</button>
								</div>
							</div>
							<div className="form-group align-self-end mb-2">
								<button id="btnConfirmCover"className="btn btn-primary mr-1" onClick={()=>{onUpdateCover(newTourCover)}}>Confirm</button>
								<button id="btnCancelCover"className="btn btn-danger" onClick={()=>{resetCover()}}>Cancel</button>	
							</div>
							<input 
								title="Reposition" 
								value={newY} 
								onChange={(e)=>setY(e.target.value)} 
								type="range" orient="vertical" className="custom-range" min="1" max="100" id="rangeY"
								/>
			            </section>
				
			</React.Fragment>
			

		);
}

export default CoverEditDiv;