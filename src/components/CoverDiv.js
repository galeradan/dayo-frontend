import React from 'react'


const CoverDiv =({nav, cover, y, title})=>{
	
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
				nav.current.classList.remove('nav-account')
				nav.current.classList.remove('nav-light')
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
	                url(${cover})`,
	  backgroundSize: `cover`,
	  backgroundRepeat: "no-repeat",
	  backgroundPosition: `50% ${y}%`
	}


	return(
			<section ref={coverSection} className="container-fluid p-0 section-cover d-flex justify-content-center align-items-center" style={coverStyling}>
                <h1 className="discover-intro font-light text-center">{title}</h1>
            </section>

		);
}

export default CoverDiv;