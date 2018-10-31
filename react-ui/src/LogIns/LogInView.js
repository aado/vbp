import React from "react";

const LogInView = ({ onSubmit }) => {
  return (
	<div>


		{/* <form className="form-signin"> */}
      
    {/* </form> */}



		{/* <h1>Login to Adovin</h1> */}
		<form onSubmit={onSubmit} className="form-signin">
		{/* <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" /> */}
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required />
      {/* <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div> */}
      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      {/* <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p> */}
			{/* <div className="form-group">
				<label> Email*</label>
				<input
					style={{ width: "100%" }}
					name="email"
					type="email"
					placeholder="Email"
					className="form-control"
				/>
			</div> */}
			{/* <div className="form-group">
				<label> Password* </label>
				<input
					style={{ width: "100%" }}
					name="password"
					type="password"
					placeholder="Password"
					className="form-control"
				/>
			</div> */}
			{/* <button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</button> */}
		</form>
	</div>
  );
};

export default LogInView;
