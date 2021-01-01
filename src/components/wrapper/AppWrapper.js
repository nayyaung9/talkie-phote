import React from "react";
import {
  AppBar,
  CssBaseline,
  Paper,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
  Badge,
  ListSubheader,
  withStyles,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import PropTypes from "prop-types"; // ES6
const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawer: {
    flexShrink: 0,
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
      paddingLeft: 8,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 10,
    background: "white",
    boxShadow: "none",
    color: "#000",
    borderBottomColor: "#e7edf2",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
  },
  spaceDrawer: {
    [theme.breakpoints.up("sm")]: {
      flex: 1,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

/**
 * Render app wrapper component
 *
 * @param  {object} props - Necessary component props
 * @returns {HTMLElement} - Render Perfect app wrapper component
 */
function AppWrapper(props) {
  const auth = useSelector((state) => state.auth);
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </StyledMenu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const messages = [
    {
      id: 1,
      primary: "Brunch this week?",
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      person: "/static/images/avatar/5.jpg",
    },
    {
      id: 2,
      primary: "Birthday Gift",
      secondary: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      person: "/static/images/avatar/1.jpg",
    },
    {
      id: 3,
      primary: "Recipe to try",
      secondary: "I am try out this new BBQ recipe, I think this might be amazing",
      person: "/static/images/avatar/2.jpg",
    },
    {
      id: 4,
      primary: "Yes!",
      secondary: "I have the tickets to the ReactConf for this year.",
      person: "/static/images/avatar/3.jpg",
    },
    {
      id: 5,
      primary: "Doctor's Appointment",
      secondary: "My appointment for the doctor was rescheduled for next Saturday.",
      person: "/static/images/avatar/4.jpg",
    },
    {
      id: 6,
      primary: "Discussion",
      secondary: `Menus that are generated by the bottom app bar (such as a bottom
        navigation drawer or overflow menu) open as bottom sheets at a higher elevation
        than the bar.`,
      person: "/static/images/avatar/5.jpg",
    },
    {
      id: 7,
      primary: "Summer BBQ",
      secondary: `Who wants to have a cookout this weekend? I just got some furniture
        for my backyard and would love to fire up the grill.`,
      person: "/static/images/avatar/1.jpg",
    },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Inbox
        </Typography>
        <List className={classes.list}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
              {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Talkie Phote
          </Typography>
          <div className={classes.spaceDrawer} />

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              aria-label="show 4 new mails"
              color="textSecondary"
              variant="contained"
              size="small">
              Create Room
            </Button>
            <Button
              aria-label="show 4 new mails"
              color="textSecondary"
              variant="outlined"
              size="small">
              Join Room
            </Button>
            {auth.isAuth ? (
              <Avatar
                src={auth.user.avatar_url}
                alt={auth.user.fullname}
                onClick={handleProfileMenuOpen}
              />
            ) : (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            {auth.isAuth ? (
              <Avatar
                src={auth.user.avatar_url}
                alt={auth.user.fullname}
                onClick={handleMobileMenuOpen}
              />
            ) : (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            <div
              style={{
                overflow: "auto",
              }}>
              {drawer}
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            <div
              style={{
                overflow: "auto",
              }}>
              {drawer}
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

AppWrapper.propTypes = {
  window: PropTypes.instanceOf(window.constructor),
  children: PropTypes.node,
};

export default AppWrapper;
