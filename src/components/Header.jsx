import {Link} from 'react-router-dom';
import StyledLink from './StyledLink';
const Header = () => {
	
	return (
		<header> 
			<div className="topnav">
				<h2>Common Words</h2>
				<StyledLink destination="/">{"Home"}</StyledLink>
				<StyledLink destination="/resources">{"Resources"}</StyledLink>
				<StyledLink destination="/about">{"About"}</StyledLink>
			</div> 
		</header>
	);
};

export default Header;
