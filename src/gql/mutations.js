import {gql} from 'apollo-boost'

const addCoverMutation = gql`
	mutation($url: String!, $vertical: Int!){
	  addCover(url: $url, vertical: $vertical){
	    id
	    url
	    vertical
	  }
	}
`


const updateCoverMutation = gql`
	mutation($id: ID!, $url: String!, $vertical: Int!){
	  updateCover(id: $id, url: $url, vertical: $vertical){
	    id
	    url
	    vertical
	  }
	}
`

const deleteCoverMutation = gql`
	mutation($id: ID!){
		deleteCover(id: $id){
			id
			url
		}
	}
`

const addTourMutation = gql`
	mutation($title: String!, $description: String!, $price: Float!, $pax: Int!, $cid: String!,$creatorId: String! ){
	  addTour(title: $title, description: $description, price: $price, pax: $pax, cid: $cid, creatorId: $creatorId){
		 id
		 title
	     description
	     price
	     pax
	     cid
	     creatorId
	  }
	  
	}
`

const updateTourMutation = gql`
	mutation($id: ID!, $title: String!, $description: String!, $price: Float!, $pax: Int! ){
	  updateTour(id: $id, title: $title, description: $description, price: $price, pax: $pax){
		 id
		 title
	     description
	     price
	     pax
	  }
	  
	}
`
const publishTourMutation = gql`
	mutation($id: ID!){
		publishTour(id: $id){
			id
			title
		}
	}

`

const deleteTourMutation = gql`
	mutation($id: ID!){
		deleteTour(id: $id){
			id
			title
		}
	}

`

const addHighlightMutation = gql`
	mutation($tid: String!, $description: String!){
		addHighlight(tid: $tid, description: $description){
			id
			description
			tid
		}
	}

`
const deleteHighlightMutation = gql`
	mutation($id: ID!){
		deleteHighlight(id: $id){
			id
			description
		}
	}
`

const addUserMutation = gql`
	mutation ($name: String!, $email: String!, $password: String!, $role: Int!, $isApproved: Boolean!) {
		addUser(name: $name, email: $email, password: $password, role: $role, isApproved: $isApproved){
			name
			email
		}
	}
`

const loginMutation = gql`
    mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        	id
            name
            role
            token
        }
    }
`

const addPackageMutation = gql`
	mutation($title: String!, $isPublished: Boolean!, $description: String!, $price: Float!, $pax: Int!, $cid: String!, $tid: String!, $url: String! ){
	  addPackage(title: $title, isPublished: $isPublished, description: $description, price: $price, pax: $pax, cid: $cid,  tid: $tid,  url: $url){
		 id
		 title
	     description
	     price
	     pax
	     cid
	     tid
	     url
	  }
	}
`

const addBookingMutation = gql`
	mutation($date: String!, $total: Float!, $persons: Int!, $pid: String!, $tid: String!, $uid: String!, $reference: String!,  $creatorId: String!, $isConfirmed: String!){
	  addBooking(date: $date,  total: $total, persons: $persons, pid: $pid, tid:$tid , uid: $uid, creatorId: $creatorId, reference: $reference, isConfirmed: $isConfirmed){
		 id
		 date
	     persons
	     total
	     isConfirmed
	     pid
	     tid
	     uid
	     reference
	  }
	  
	}
`

const cancelBookingMutation = gql`
	mutation($id: ID!){
		cancelBooking(id: $id){
			id
		}
	}

`

const confirmBookingMutation = gql`
	mutation($id: ID!){
		confirmBooking(id: $id){
			id
		}
	}

`

const availableTourMutation = gql`
	mutation($id: ID!){
		availableTour(id: $id){
			id
			title
		}
	}

`

const unavailableTourMutation = gql`
	mutation($id: ID!){
		unavailableTour(id: $id){
			id
			title
		}
	}

`


export {
	addCoverMutation,
	addTourMutation,
	deleteTourMutation,
	deleteCoverMutation,
	updateTourMutation,
	updateCoverMutation,
	publishTourMutation,
	addHighlightMutation,
	deleteHighlightMutation,
	loginMutation,
	addUserMutation,
	addPackageMutation,
	addBookingMutation,
	cancelBookingMutation,
	confirmBookingMutation,
	availableTourMutation,
	unavailableTourMutation
}