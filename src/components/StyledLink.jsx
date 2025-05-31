import {Link} from 'react-router';
/*for custom "link to" styling*/
const StyledLink = ({children, destination}) => {
    return (
        <Link to={destination}>
            <span className='link'>{children}</span>
        </Link>
    )
}

export default StyledLink;

