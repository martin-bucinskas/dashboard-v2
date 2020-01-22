import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseWidget from '../base';

import './styles.scss';

export default class WeatherWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__text');
    // eslint-disable-next-line no-undef,no-unused-vars,max-len
    const value = this.props.format ? numeral(this.state.value).format(this.props.format) : this.state.value;

    let description = 'Unknown';
    let temperature = 100.0;
    let min = -111.0;
    let max = 111.0;

    if (typeof this.state.value !== 'undefined') {
      description = this.state.value.weather[0].main;
      temperature = this.state.value.main.temp;
      min = this.state.value.main.temp_min;
      max = this.state.value.main.temp_max;
    }

    return (
      <div className={classList}>
        <h1 className="widget__title">Weather</h1>
        <hr/>
        <p className="widget-reminders-value">{temperature}&deg;C</p>
        <p className="widget-reminders-value">{description}</p>
        <p className="widget-reminders-value">{max}&deg;C / {min}&deg;C</p>
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

WeatherWidget.propTypes = {
  format: PropTypes.string,
};
