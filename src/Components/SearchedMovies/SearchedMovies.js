import React from 'react';
import "./SearchedMovies.scss"
import TMDBApi from 'utils/TMDBApi';
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import ImgPlaceholder from '../../Images/imgPlaceholder.svg'

const POSTER_WIDTH = 154;
const VOTE_AVERAGE_MAX_VALUE = 10;
const VOTE_AVERAGE_DISPLAY_PERCENT = false;
const POPULARITY_MAX_VALUE = 100;
const POPULARITY_DISPLAY_PERCENT = true;

const SearchedMovies = (props) => {
  const {
    poster,
    title,
    release_date,
    runtime,
    genres,
    director,
    vote_average,
    popularity
  } = props;

  const renderPoster = () => {
    return (
      <div className='searched-movies__poster routed-image'>
        <img 
          src={ poster ? `${TMDBApi.getImgURL(POSTER_WIDTH)}${poster}` : ImgPlaceholder} 
          alt='poster'
          onClick={props.routeToMovieDetails}
        />
      </div>
    );
  };

  const renderTitle = () => {
    return (
    <div 
      className='searched-movies__title routed-text' 
      onClick={props.routeToMovieDetails}
    >
      {title}
    </div>
    );
  };

  const renderReleaseDate = () => {
    return (
      <div className='searched-movies__first-container-release'>
        <div className='searched-movies__first-container-release-title'>Release date:</div>
        <div className='searched-movies__first-container-release-text'>{release_date}</div>
      </div>
    );
  };

  const renderRuntime = () => {
    return (
      <div className='searched-movies__first-container-runtime'>
        <div className='searched-movies__first-container-runtime-title'>Runtime: </div>
        <div className='searched-movies__first-container-runtime-text'>{`${runtime} min.`}</div>
      </div>
    );
  };

  const renderGenres = () => {
    return (
      <div className='searched-movies__second-container-genres'>
        <div className='searched-movies__second-container-genres-title'>Genres:</div>
        <div className='searched-movies__second-container-genres-text'>{genres}</div>
      </div>
    );
  };

  const renderDirector = () => {
    return (
      <div className='searched-movies__second-container-director'>
        <div className='searched-movies__second-container-director-title'>Director:</div>
        <div className='searched-movies__second-container-director-text'>{director}</div>
      </div>
    );
  };

  const renderVoteAverage = () => {
    return (
      <div className='searched-movies__votes-average'>
        <div className='searched-movies__votes-average-title'>Vote average:</div>
        <div className='searched-movies__votes-average-chart'>
          <DoughnutChart 
            data={vote_average} 
            maxValue={VOTE_AVERAGE_MAX_VALUE} 
            percent={VOTE_AVERAGE_DISPLAY_PERCENT} 
          />
        </div>
      </div>
    );
  };

  const renderPopularity = () => {
    return (
      <div className='searched-movies__votes-popularity'>
        <div className='searched-movies__votes-popularity-title'>Popularity:</div>
        <div className='searched-movies__votes-popularity-chart'>
          <DoughnutChart 
            data={Math.floor(popularity)} 
            maxValue={POPULARITY_MAX_VALUE} 
            percent={POPULARITY_DISPLAY_PERCENT} 
          />
        </div>
      </div>
    );
  };

  return (
    <div className='searched-movies'>
      { renderPoster() }
      { renderTitle() }
      <div className='searched-movies__first-container'>
        { renderReleaseDate() }
        { renderRuntime() }
      </div>
      <div className='searched-movies__second-container'>
        { renderGenres() }
        { renderDirector() }
      </div>
      <div className='searched-movies__votes'>
        { renderVoteAverage() }
        { renderPopularity() }
      </div> 
    </div>
  );
};

SearchedMovies.defaultProps = {
  poster: '???',
  title: '???',
  release_date: '???',
  runtime: 0,
  genres: '???',
  director: '???',
  vote_average: 0,
  popularity: 0
};

export default SearchedMovies