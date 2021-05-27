import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default function Navbar(props) {
	const { classes } = props;

	return (
		<nav className={classes}>
		  <div className="container">
		  	<button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <Link className="navbar-brand" to="/"><i className="fa fa-bars mr-1"></i> CSVoucher</Link>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			    	<li className="nav-item mr-1">
			        <Link className="nav-link" to="/" activeClassName="active">
			        	Home
			        </Link>
			      </li>

			      {props.children}

			      <li className="nav-item mr-1">
			        <Link className="nav-link" to="/prices" activeClassName="active">
			        	Prices
			        </Link>
			      </li>
			      <li className="nav-item mr-1">
			        <Link className="nav-link" to="/about" activeClassName="active">
			        	About
			        </Link>
			      </li>
			    </ul>
			  </div>
		  </div>
		</nav>
	);
}
