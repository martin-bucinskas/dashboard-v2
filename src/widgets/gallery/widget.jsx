import React from 'react';
import classNames from 'classnames';

import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';

import BaseWidget from '../base';
import './styles.scss';


export default class Gallery extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
    };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__buildStatus');

    const divs = [];
    if (typeof this.state.value !== 'undefined') {
      this.state.value.forEach((url, index) => {
        const entry = (
          // eslint-disable-next-line react/no-array-index-key
          <Slide key={`gallery-slide-${index}`} index={index}><div className="parent"><div className="container"><img src={url.original} alt="Unavailable" /></div></div></Slide>
        );
        divs.push(entry);
      });
    }

    return (
      <div className={classList}>
        <div className="gallery-body">
          <CarouselProvider
            naturalSlideWidth={600}
            naturalSlideHeight={350}
            interval={8000}
            infinite="true"
            isPlaying="true"
            totalSlides={divs.length}
          >
            <Slider>
              {divs}
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
};
