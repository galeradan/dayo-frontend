import React from 'react'
import swal from 'sweetalert';
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash';
import {loginMutation} from '../gql/mutations'
import { NavLink, useHistory } from 'react-router-dom'

const LoginPage =(props)=>{
	let navbar = props.innerRef
	let history = useHistory()
	
	const user = props.user()
	
	const [loaded, setLoaded] = React.useState(false)
	const [processing, setProcessing] = React.useState(false)

	React.useEffect(()=>{
		navbar.current.classList.remove('nav-transparent')
		navbar.current.classList.remove('nav-light')
		navbar.current.classList.add('nav-account')
		setLoaded(true)
	},[loaded,navbar])

	// const [isAuth, setIsAuth] = React.useState(false)
	const [authUser, setAuthUser] = React.useState(user)
	
	React.useEffect(()=>{
		if (authUser!==undefined) {
			// setIsAuth(true)
			setAuthUser(user)
			history.push(`/discover`)
		}else{
			// setIsAuth(false)
		}

	},[authUser]) // eslint-disable-line react-hooks/exhaustive-deps
	
	const [email,setEmail] = React.useState('');
	const [password,setPassword] = React.useState('');
	// const [isRedirected, setIsRedirected] = useState(false)
	
	const login=()=>{
		setProcessing(true)
		props.loginMutation({
			variables:{
				email: email,
				password: password,
			}
		}).then((res)=>{
			let data = res.data.login
			

			if(data!==null){
				swal("Login Success!", "Redirecting to your startup page", {
				  icon: "success",
				  buttons: false,
				  timer: 1000
				}).then(()=>{
					let userData = {
						name: data.name,
						id: data.id,
						role: data.role,
						token: data.token
					}

					localStorage.setItem(`user`, JSON.stringify(userData))

					let user = JSON.parse(localStorage.getItem("user"))
					
					if(props.updateSession()){
						if (user.role===1) {
							history.push(`/manage`)
						}
						else{
							history.push(`/discover`)
						}
					}
				})
				


			}else{
				swal("Login failed!", "Check your email and password then please try again", {
				  icon: "error",
				  buttons: false,
				})
				.then(()=>{
					setProcessing(false)
				})
			}
		},(err)=>{
			console.log(err)
		})
	}

	return(
			<div className="container-fluid after-nav-md">
				<div className="row">
					<div className="col-lg-6 section-left">

					</div>
					<div className="col-lg-6 section-right d-flex justify-content-center align-items-center">
						 <div className="card account-card">
							<div className="card-body">
								<h4>Log in to your account</h4>
								<small className="text-muted">Don't have an account? <NavLink to="/register">Create here.</NavLink></small>
								<div className="form-group mt-4">
									<label htmlFor="email" className="text-muted mb-0">Email address</label>
									<input 
										type="text" 
										className="form-control mb-3" 
										id="email"
										value={email}
										onChange={(e)=>setEmail(e.target.value)}
										/>

									<label htmlFor="password" className="text-muted mb-0">Password</label>
									<input 
										type="password" 
										className="form-control mb-3" 
										id="password"
										value={password}
										onChange={(e)=>setPassword(e.target.value)}
										/>
								</div>
								<div className="form-group">
									<button 
										className="btn btn-primary btn-block mt-4"
										onClick={login}
										disabled={processing}
										>{processing? 'Logging in...': 'Login'}</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default compose(
					graphql(loginMutation, 
							{name: 'loginMutation'})
				)(LoginPage);
