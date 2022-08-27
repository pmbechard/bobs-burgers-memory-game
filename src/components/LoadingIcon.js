import React from 'react';
import './LoadingIcon.css';
import loadingIcon from './img/loading.png';

function LoadingIcon(props) {
  if (props.loading === true) {
    return (
      <div>
        <img src={loadingIcon} alt='loading' id='loading-icon' />
      </div>
    );
  } else {
    return null;
  }
}

export default LoadingIcon;
