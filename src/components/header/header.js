import Bitogram from './bitogram.png'
import './header.css'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import PagesOutlinedIcon from '@mui/icons-material/PagesOutlined';
import { Link } from 'react-router-dom'
const Header = () => {
  const logo = Bitogram
  return (
    <div className="header">
      <div className="header_logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="searchbar">   <input
        type="text"
        className="search"
        placeholder='Paieskos fraze'


      /></div>
      <div className="header_menu">
        <ul>
          <li><div class="dropdown">
            <ExploreOutlinedIcon className='dropbtn' />
            <div class="dropdown-content">
              <Link to='/newpost'><SearchOutlinedIcon />Naujas įrašas </Link>
              <Link to='/'><RestoreOutlinedIcon />Live</Link>
              <Link to='/'><PagesOutlinedIcon />Story 1</Link>
            </div>
          </div></li>

          <li><div className='dropdown1'><FavoriteBorderOutlinedIcon /></div></li>
          <li><div className='dropdown2'><PersonOutlineOutlinedIcon /></div></li>
        </ul>
      </div>
    </div>
  )
}
export default Header;