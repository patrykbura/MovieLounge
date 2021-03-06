import React from 'react';
import { Link } from "react-router-dom";
import SubMenu from 'antd/lib/menu/SubMenu';
import { 
  Menu,
  Layout,
} from 'antd';
import { 
  PlaySquareOutlined,
  BarsOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  FireOutlined,
  RiseOutlined,
  CalendarOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined,
  TrophyOutlined 
} from '@ant-design/icons';
import './LayoutHeader.scss';
import { withRouter } from 'react-router-dom'
import SearchInput from '../SearchInput/SearchInput'
import UserUtil from 'utils/UserUtil'

const SEARCH_BAR_WIDTH = '300px';
const SERACH_BAR_PLACEHOLDER = 'Find your favorite movies';
const { Header } = Layout;

function LayoutHeader (props) {
 const renderSubMenu = (title, icon, menuItems) => {
    return (
      <SubMenu key={ title } icon={ icon } title={ title } popupClassName='ant-menu-dark' popupOffset={[0, 0]}>
        {menuItems.map((item, idx) => 
        <Menu.Item key={ idx } onClick={item.onClick} icon={item.icon}>
          <Link to={ item.url }>{ item.title }</Link>
        </Menu.Item>)}
      </SubMenu>
    );
  };
  
  const renderTopListsMenu = () => {
    const menuItems = [{
      title: 'Top Rated',
      url:'/toplist/top_rated',
      icon: <TrophyOutlined />
    },{
      title: 'Trending Today',
      url:'/toplist/trending_daily',
      icon: <FireOutlined />
    },{
      title: 'Trending Weekly',
      url:'/toplist/trending_weekly',
      icon: <RiseOutlined />
    }]
  
    return renderSubMenu('Top Lists',<BarsOutlined />, menuItems)
  };
  
  const renderNewMoviesSubMenu = () => {
    const menuItems = [{
      title: 'Upcomming',
      url:'/new/upcomming',
      icon: <CalendarOutlined />
    },{
      title: 'Now Playing',
      url:'/new/now_playing',
      icon: <DesktopOutlined />
    }]
  
    return renderSubMenu('Recent',<ClockCircleOutlined />, menuItems)
  };

  const renderUserVotesMenu = () => {
    if (UserUtil.isUserLogged()) {
      return (
        <Menu.Item className="main-menu__right-from-searchbar" key='user-ratings' icon={<PieChartOutlined/>}>
          <Link to='/user-ratings'>My Ratings</Link>
        </Menu.Item>
      )
    } else {
      return null
    };
  };

  const renderYouProfileMenu = () => {
    const menuItems = [{
      title: 'Account Settings',
      url:"/settings",
      icon: <SettingOutlined />
    },{
      title: 'Log Out',
      url:"/",
      onClick: UserUtil.logOut,
      icon: <LogoutOutlined />
    }]

    const guestMenuItems = [{
      title: 'Log in or Register',
      url:"/",
      icon: <LoginOutlined />
    }]

    if (!UserUtil.isUserLogged()) {
      return renderSubMenu("Guest", <UserOutlined />, guestMenuItems)
    } else {
      const userName = localStorage.getItem("userName") ? localStorage.getItem("userName") : "Guest";
      return renderSubMenu(userName, <UserOutlined />, menuItems)
    };
  };

  const renderSearchBar = () => {
    return (
      <SearchInput
        onSearch={value => { 
          if (value) {
            props.handleSearch(value);
            props.history.push('/search-results');
        }}}
        placeholder={SERACH_BAR_PLACEHOLDER}
        enterButton={true}
        defaultValue=''
        searchBarWidth={SEARCH_BAR_WIDTH}
      />
    );
  };

  const renderMovieLoungeLogo = () => {
    return (
      <Menu className ='nav-bar-menu__title' theme="dark" mode="horizontal">  
        <Menu.Item key="1" icon={<PlaySquareOutlined/>}>
          <Link to ='/home'>Movie Lounge</Link>
        </Menu.Item>
      </Menu>
    );
  };

  const renderAboutItem = () => {
    return (
      <Menu.Item className="main-menu__right-from-searchbar" key={ 'about' } icon={<InfoCircleOutlined/>}>
        <Link to='/about'>About</Link>
      </Menu.Item>
    );
  };
  
  const renderContactItem = () => {
    return (
      <Menu.Item className="main-menu__right-from-searchbar" key={ 'contact' } icon={<MailOutlined />}>
        <Link to='/contact'>Contact</Link>
      </Menu.Item>
    );
  };
  
  return (
    <Header style={{ position: 'fixed', zIndex: 1001, width: '100%' }}>
      <div className='home-header'>
        {renderMovieLoungeLogo()}
      </div>
      <div className='main-menu'>
        <Menu 
          className ='nav-bar-menu' 
          theme="dark" 
          mode="horizontal" 
          selectedKeys={[]}
        >
          { renderTopListsMenu() }
          { renderNewMoviesSubMenu()}
          { renderSearchBar() }
          { renderAboutItem() }
          { renderContactItem() }
        </Menu>
      </div>
      <div className="your-profile">
        <Menu 
          className ='nav-bar-menu' 
          theme="dark" 
          mode="horizontal" 
          selectedKeys={[]}
        >
          {renderUserVotesMenu()}
          {renderYouProfileMenu()}
        </Menu>
      </div>
    </Header>
  );
};

export default withRouter(LayoutHeader)