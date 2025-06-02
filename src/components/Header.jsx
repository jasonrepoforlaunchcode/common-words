import StyledLink from './StyledLink';

const Header = () => {
	
	return (
		<header> 
			<div className="topnav">
				<div className="title">Common Words</div>
				<div>
					<StyledLink destination="/">{"Home"}</StyledLink>
					<StyledLink destination="/resources">{"Resources"}</StyledLink>
					<StyledLink destination="/about">{"About"}</StyledLink>
				</div>
			</div> 
		</header>
	);
};

export default Header;
