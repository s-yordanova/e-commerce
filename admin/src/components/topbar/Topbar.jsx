import { ExitToApp, Language, NotificationsNone, Settings } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/apiCalls';
import "./topbar.css"


function Topbar() {
    
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(dispatch);
    navigate("/");
  };

  return (
    <div className = "topbar">
        <div className='topbarWrapper'>
            <div className="topLeft">
                <span className='logo'>ArcherAdmin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Language/>
                </div>
                <div className="topbarIconContainer">
                {currentUser ? (
            <Link className='linkStyle' to="/" onClick={handleLogout}>
              <ExitToApp/>
            </Link>
          ) : null} 
                </div>
                <div className="topbarIconContainer">{currentUser.username}</div>
                <img src={ currentUser.img || "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="} alt="" className="topAvatar" />
            </div>
        </div>
    </div>
  )
}

export default Topbar