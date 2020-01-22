import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseWidget from '../base';
import ReactTextRotator from '../../components/react-text-rotator';

import './styles.scss';

export default class OverheardWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__text');

    return (
      <div className={classList}>
        <h1 className="widget__title">Overheard</h1>
        <hr />
        <div className="widget-reminders-value"><ReactTextRotator content={this.state.value} time={8000} startDelay={1000} /></div>
      </div>
    );
  }
}

OverheardWidget.propTypes = {
  format: PropTypes.string,
};
