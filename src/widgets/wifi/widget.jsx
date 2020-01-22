import React from 'react';
import classNames from 'classnames';
import BaseWidget from '../base';

import './styles.scss';
import PropTypes from 'prop-types';

export default class WifiWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = { value: '---' };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__text');

    let wifiPassword = '---';
    if (typeof this.state.value !== 'undefined') {
      wifiPassword = this.state.value;
    }
    return (
      <div className={classList}>
        <h1 className="widget__title">Guest WiFi Password</h1>
        <hr />
        {/* <h3 className="widget__value">{this.state.value}</h3> */}
        <p className="widget-reminders-value">{wifiPassword}</p>
      </div>
    );
  }
}

WifiWidget.propTypes = {
  format: PropTypes.string,
};
