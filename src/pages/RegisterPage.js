import React from 'react';
import swal from 'sweetalert';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {addUserMutation} from '../gql/mutations';
import { useHistory, NavLink } from 'react-router-dom'


// import {emailCheckQuery} from '../gql/queries'

const RegisterPage =(props)=>{
	let navbar = props.innerRef
	let history = useHistory();
	const [loaded, setLoaded] = React.useState(false)	

	const user = props.user()

	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [type, setType] = React.useState(2);
	const [password, setPassword] = React.useState('');
	const [processing, setProcessing] = React.useState(false)


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

	React.useEffect(()=>{
		navbar.current.classList.remove('nav-transparent')
		navbar.current.classList.remove('nav-light')
		navbar.current.classList.add('nav-account')
		setLoaded(true)
	},[loaded,navbar])

	const onCreateAccount=()=>{
		setProcessing(true)
		
		// console.log(props)
		// props.emailCheckQuery({
		// 	variables: { email: email}
		// }).then((res)=>{
		// 	console.log(res)
		// })

		if (name !== "" && type !== "" && email !== "" && password !== ""){
			props.addUserMutation({
				variables: {
					name: name,
					email: email,
					password: password,
					role: parseInt(type),
					isApproved: true
				}
			}).then((res)=>{
				swal("Account created!", "Redirecting to login", {
				  icon: "success",
				  buttons: false,
				  timer: 1000
				}).then((res)=>{
					history.push(`/login`)
				})
			}, (err)=>{
				swal("Creation failed!", "Please check the details and try again", {
				  icon: "error",
				  buttons: false,
				}).then(()=>{
					setProcessing(false)
				})
			})
		}else{
			swal("Creation failed!", "Please check the details and try again", {
			  icon: "error",
			  buttons: false,
			}).then(()=>{
				setProcessing(false)
			})
		}
		
	}

	return(
			<div className="container-fluid after-nav-md">
				<div className="row">
					<div className="col-lg-6 section-left">

					</div>
					<div className="col-lg-6 section-right d-flex justify-content-center align-items-center">
						 <div className="card account-card">
							<div className="card-body">
								<h4>Create an account</h4>
								<small className="text-muted">Already have an account? <NavLink activeClassName="active" to="/login">Login here.</NavLink></small>
								
								<div className="form-group mt-4">
									<label htmlFor="name" className="text-muted mb-0">Full name</label>
									<input 
										type="text" 
										className="form-control mb-3" 
										id="name"
										value={name}
										onChange={(e)=>setName(e.target.value)}
										/>
								</div>
								<div className="form-group">
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
									<label htmlFor="type" className="text-muted mb-0">Join as a</label>
									<select name="" id="type" className="form-control" onChange={(e)=>setType(e.target.value)}>
										<option value="2">Client for regular booking</option>
										<option value="1">Creators for creating tour packages</option>
									</select>
								</div>
								<div className="form-group">
									<button 
										className="btn btn-primary btn-block mt-4"
										onClick={onCreateAccount}
										disabled={processing}
										>{processing? "Creating account...": "Create account"}</button>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
}

export default compose(
					graphql(addUserMutation, 
							{name: 'addUserMutation'}),
				)(RegisterPage);

