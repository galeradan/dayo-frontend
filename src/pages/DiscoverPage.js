import React from 'react'

// Components
import CoverDiv from '../components/CoverDiv'
import SearchSection from '../components/discover/SearchSection'
import TitleSection from '../components/discover/TitleSection'
import ToursList from '../components/discover/ToursList'


// Resources
import cover from '../assets/images/sec-cover4.jpg';

// GraphQL ApolloBoost Dependencies

import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {getPublishedToursQuery} from '../gql/queries'



const DiscoverPage =(props)=>{
	let y = 50;
	const navbar = props.innerRef;
	
	const getTours = props.getPublishedToursQuery.publishedTours

	const [tours, setTours] = React.useState([])

	const [loaded, setLoaded] = React.useState(false)
	
	React.useEffect(()=>{
		navbar.current.classList.remove('nav-light')
		navbar.current.classList.remove('nav-account')
		navbar.current.classList.add('nav-transparent')
		setLoaded(true)
	},[loaded,navbar,props])
	

	React.useEffect(()=>{
		if(getTours !== undefined){
			setTours(getTours)
		}
	},[getTours])
	return(
			<React.Fragment>
				<CoverDiv
					nav={navbar}
					cover={cover}
					y={y}
					title={"Discover Philippines"}
					/>
				<SearchSection/>
				<TitleSection/>
				<ToursList tours={tours}/>
			</React.Fragment>
			

		);
}

export default compose(
						graphql(getPublishedToursQuery, 
								{name: 'getPublishedToursQuery'}),
					  )(DiscoverPage);