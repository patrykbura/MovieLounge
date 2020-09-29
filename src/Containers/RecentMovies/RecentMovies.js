import React from 'react';
import './RecentMovies.scss';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Divider } from 'antd'
import UpcommingMovies from 'components/UpcommingMovies/UpcommingMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import { fetchRecentMovies, fetchNextPageOfRecentMovies } from 'actions/RecentMoviesActions'
import { withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin } from 'antd';

const TOP_LIST_RECENT_MOVIES_TYPES = {
  'upcomming': 'UPCOMMING MOVIES',
  'now_playing': 'MOVIES PLAYING NOW IN THEATERS',
}

class TopList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        currentPage: 1
    };
  }

  componentDidMount() {
    this.props.fetchRecentMovies(this.props.match.params.type);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.type !== this.props.match.params.type) {
      this.setState({ currentPage: 1 });
      this.props.fetchRecentMovies(this.props.match.params.type);
    };
  };

  fetchData = () => {
    this.setState({ currentPage: this.state.currentPage + 1})
    this.props.fetchNextPageOfRecentMovies(this.props.match.params.type, this.state.currentPage)
  };
  
  renderResults = () => {

    let results = [];

    const getUpcommingMoviesBlock = (index) => {
      const item = this.props.recentMovies[index];

      if (!item) {
        return null;
      }

      return <UpcommingMovies item={item} routeToMovieDetails={() => this.props.routeToMovieDetails(item.id)}/>
    }

    for (let i = 0; i < this.props.recentMovies.length; i+=3) {
      results.push(
        <div className='recent-movies__item' style={ {display:'flex'} }>
          {[getUpcommingMoviesBlock(i),getUpcommingMoviesBlock(i+1),getUpcommingMoviesBlock(i+2)]}
        </div>
      )
    }

    return (
      <InfiniteScroll
        dataLength={results.length}
        next={this.fetchData}
        hasMore={this.state.currentPage < this.props.numberOfPages} 
        initialScrollY={3}
        loader={
          <Spin 
            size="large"
            className='top-list__spin'
          />
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen all the movies on this list!</b>
          </p>
        }
      >
        {results}
      </InfiniteScroll>
    );
  };

  render() {
    return (
      <div className='recent-movies'>
        <Divider className='recent-movies__title' orientation='center'>
          <span>
            {TOP_LIST_RECENT_MOVIES_TYPES[this.props.match.params.type]}
          </span>
        </Divider>
        <div className='recent-movies__container'>
          {this.renderResults()}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    recentMovies: state.recentMovies.results,
    numberOfPages: state.recentMovies.numberOfPages
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  routeToMovieDetails,
  fetchRecentMovies,
  fetchNextPageOfRecentMovies 
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopList));