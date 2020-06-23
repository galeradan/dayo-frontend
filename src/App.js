import React  from 'react';

// Partials
import AppNavBar from './partials/AppNavBar'
import AppFooter from './partials/AppFooter'

// Pages
import DiscoverPage from './pages/DiscoverPage'
import TourPage from './pages/TourPage'
import TourEditPage from './pages/TourEditPage'
import ManagePage from './pages/ManagePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import BookingPage from './pages/BookingPage'


// Routers
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

// import the Apollo components to use these on our entire react App

import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
// with these 2 components from apollo boost and react apollo, we can now use GraphQL queries and mutations

const client = new ApolloClient({
      uri:'https://salty-reaches-34466.herokuapp.com/graphql',
      request: async (operation) => {
      const user =  JSON.parse(localStorage.getItem("user"))
      operation.setContext({
        headers: {
          authorization: user ? `Bearer ${user.token}` : ''
        }
      })
    }
  })



const App =()=> {
  let navRef = React.createRef();

  const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem("user")))
  
  const updateSession=()=>{
    setCurrentUser(JSON.parse(localStorage.getItem("user")))
    return true
  }

  const user =()=>{
    if (currentUser!==null) {
      return {
        name: currentUser.name,
        role: currentUser.role,
        id: currentUser.id,
        token: currentUser.token,
      }
    }
  }

  return (
    <React.Fragment>

      <ApolloProvider client={client}>
        
        <BrowserRouter>
          <AppNavBar user={user} updateSession={updateSession} innerRef={navRef}/>
          <div className="wrapper d-flex flex-column align-items-stretch">
            <main className="">
              <Switch>
                <Route exact path="/discover" render={(props)=><DiscoverPage{...props} innerRef={navRef}/>}/>
                <Route exact path="/tour/view/:tid" render={(props)=><TourPage {...props} user={user} innerRef={navRef}/>}/>
                <Route exact path="/tour/edit/:tid" render={(props)=><TourEditPage {...props} user={user} innerRef={navRef}/>}/>
                <Route exact path="/login" render={(props)=><LoginPage{...props} updateSession={updateSession}user={user} innerRef={navRef}/>}/>
                <Route exact path="/register" render={(props)=><RegisterPage{...props} user={user} innerRef={navRef}/>}/>
                <Route exact path="/manage" render={(props)=><ManagePage{...props} user={user} innerRef={navRef}/>}/>
                <Route exact path="/bookings/:uid" render={(props)=><BookingPage{...props} user={user} innerRef={navRef}/>}/>
                <Redirect from="/" to='/discover'/>
              </Switch>
             </main>
           <AppFooter/>
          </div>

        </BrowserRouter>

      </ApolloProvider>
       
    </React.Fragment>
  );
}

export default App;
