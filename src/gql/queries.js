import {gql} from 'apollo-boost'


const getToursQuery = gql`
{
  tours{
     id
     title
     description
     price
     pax
     cid
     isPublished
     cover{
       id
       url
       vertical
     }
     creator{
       id
       name
     }
   }
}`

const getPublishedToursQuery = gql`
{
  publishedTours{
     id
     title
     description
     price
     pax
     cid
     cover{
       id
       url
       vertical
     }
     creator{
       id
       name
     }
   }
}`

const getCreatorToursQuery = gql`
query($creatorId: String!){
  creatorTours(creatorId: $creatorId){
    id
    title
    description
    cid
    price
    isPublished
    cover{
      id
      url
      vertical
    }
    creator{
      id
      name
    }
  }
  
}
`

const getTourQuery = gql`
query($id: ID!){
  tour(id: $id){
     id
     title
     description
     price
     pax
     cid
     isPublished
     cover{
       id
       url
       vertical
     }
     highlights{
     	   id
         description
         tid
     }
     creator{
       id
       name
     }
   }
}`

const getUserBookingsQuery = gql`
query($uid: String!){
  userBookings(uid: $uid){
    id
    date
    reference
    persons
    total
    isConfirmed
    pid
    tid
    uid
    creatorId
    package{
      id
      title
      price
      pax
      description
      isPublished
      cid
      url
      tid
      cover{
        id
        url
        vertical
      }
    }
  }
  
}
`
const getCreatorBookingsQuery = gql`
query($creatorId: String!){
  bookings(creatorId: $creatorId){
    id
    date
    reference
    persons
    total
    isConfirmed
    pid
    tid
    uid
    creatorId
    package{
      id
      title
      price
      pax
      url
      description
      isPublished
      cid
      tid
    }
    user{
      id
      name
      email
    }
  }
  
}
`
const emailCheckQuery = gql`
query($email: String!){
  emailCheck(email: $email){
    name
    email
  }
  
}

`
export {
	getToursQuery,
	getPublishedToursQuery,
  getCreatorToursQuery,
	getTourQuery,
  getUserBookingsQuery,
  getCreatorBookingsQuery,
  emailCheckQuery
}