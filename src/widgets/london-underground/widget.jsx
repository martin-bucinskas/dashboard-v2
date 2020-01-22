import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseWidget from '../base';

import './styles.scss';

export default class LondonUndergroundWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__text');
    // eslint-disable-next-line max-len
    const value = this.props.format ? numeral(this.state.value).format(this.props.format) : this.state.value;

    let lines = [];

    if (typeof this.state.value !== 'undefined') {
      this.state.value.forEach(line => {
        const lineName = line.name;
        const status = line.lineStatuses[0].statusSeverityDescription;
        const entry = (
          <div key={`tube-line-${line.id}`}>
            <div id="arrival-line-colour-box">
              <div className="arrival-line-colour" id={line.id} />
            </div>
            <p className="tube-line-text" id={line.id}>{lineName} - {status}</p>
          </div>
        );
        lines.push(entry);
      });
    }

    return (
      <div className={classList}>
        <h1 className="widget__title">London Travel Updates</h1>
        <hr />
        {/* eslint-disable-next-line react/no-array-index-key */}
        {lines.map((line, index) => (<div key={`line-${index}`}>{line}</div>))}
        <br />
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

LondonUndergroundWidget.propTypes = {
  format: PropTypes.string,
};
