import React, { useState, useContext, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import History from '@material-ui/icons/History';
import MoreIcon from '@material-ui/icons/MoreVert';


// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { GET_HISTORY_TOGGLE } from '../../graphql/queries/historyToggleQueries';
// import { UPDATE_HISTORY_TOGGLE } from '../../graphql/mutations/historyToggleMutation';

// import Badge from '@material-ui/core/Badge';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';

import AccountCircle from '@material-ui/icons/AccountCircle';
// import {HistoryToggleContext} from '../../context/history-toggle-context';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

// uncomment for redux
import {useSelector, useDispatch} from 'react-redux';
import { toggleHistory } from "./history-menu.slice";

import useStyles from './menu.styles';
import { BrowserRouter as Link } from 'react-router-dom';

const PrimaryMenuAppBar = (props) => {
  const classes = useStyles();
  // uncomment for context
  // const historyToggleContext = useContext(HistoryToggleContext);

  // uncomment for redux
  const historyToggle = useSelector(state => state.historyMenu.historyToggle);
  const dispatch = useDispatch();

  // const { data } = useQuery(GET_HISTORY_TOGGLE);

  // const [toggleHistory] = useMutation(UPDATE_HISTORY_TOGGLE, { variables: { historyToggle: !data.historyToggle } })

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleHistoryToggle = (event) => {  
    // uncomment for Context
    // historyToggleContext.myFunction();
    // console.log(historyToggleContext.historyToggle);
    // historyToggleContext.setHistoryToggle(!historyToggleContext.historyToggle);

    // uncomment for redux
    dispatch(toggleHistory(!historyToggle));

    // uncomment for apollo state management
    // toggleHistory();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/signin">Login</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Manage</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleHistoryToggle}>
        <IconButton color="inherit" >
          {/*  uncomment for Context
          <HistoryToggleContext.Consumer>
            { historyToggleContext => {
                return (
                  <Fragment>
                    {historyToggleContext.historyToggle ? 
                    <History /> : 
                    <History color="action" />
                    }
                  </Fragment>
                );
              }
            }
          </HistoryToggleContext.Consumer> */}

          {/* uncomment for redux */}
            <Fragment>
              {historyToggle ? 
              <History /> : 
              <History color="action" />
              }
            </Fragment>

          {/* uncomment for apollo
            <Fragment>
              {data.historyToggle ? 
              <History /> : 
              <History color="action" />
              }
            </Fragment> */}
        </IconButton>
        <p>History</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <div className={classes.sectionDesktop}>
        <IconButton color="inherit" onClick={handleHistoryToggle}>
          {/* uncomment for react context
          <HistoryToggleContext.Consumer>
            { historyToggleContext => {
                return (
                  <Fragment>
                    {historyToggleContext.historyToggle ? 
                    <History /> : 
                    <History color="action" />
                    }
                  </Fragment>
                );
              }
            }
          </HistoryToggleContext.Consumer> */}

          {/* uncomment for apollo client
          <Fragment>
            {data.historyToggle ? 
            <History /> : 
            <History color="action" />
            }
          </Fragment> 
          */}

          <Fragment>
            {historyToggle ? 
            <History /> : 
            <History color="action" />
            }
          </Fragment>
        </IconButton>
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon title="notifications" />
          </Badge>
        </IconButton> */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {renderMobileMenu}
        {renderMenu}
      </div>

      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
    </Fragment>
  );
};

export default PrimaryMenuAppBar;