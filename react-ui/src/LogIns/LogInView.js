import React from "react";

const LogInView = ({ onSubmit }) => {
  return (
	<div className="col-4">
		<h1>Login to Adovin</h1>
		<form onSubmit={onSubmit}>
			<div className="form-group">
				<label> Email*</label>
				<input
					style={{ width: "100%" }}
					name="email"
					type="email"
					placeholder="Email"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label> Password* </label>
				<input
					style={{ width: "100%" }}
					name="password"
					type="password"
					placeholder="Password"
					className="form-control"
				/>
			</div>
			<button type="submit" className="btn btn-primary btn-lg">Log in</button>
		</form>
	</div>
  );
};

export default LogInView;
