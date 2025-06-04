import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const Title = () => {
    return (
    <div className='title'>


      <h1 className='titlea'>
        TripMate <FontAwesomeIcon className='iconA' icon={faPlane} />
      </h1>
      <p className='subtitle'>
        Your ultimate companion for seamless travel planning and unforgettable journeys.
      </p>

    </div>
    );
  };

export default Title;
