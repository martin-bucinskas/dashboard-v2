import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseWidget from '../base';

import './styles.scss';

export default class ManchesterTramsWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      updatedAt: undefined,
    };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__text');
    const value = this.props.format ? numeral(this.state.value).format(this.props.format) : this.state.value;

    let lines = 'All Lines';
    let status = 'Unknown';

    if(typeof this.state.value !== 'undefined') {
      lines = this.state.value.items[0].name;
      status = this.state.value.items[0].status;
    }

    return (
      <div className={classList}>
        <h1 className="widget__title">Manchester Travel Updates</h1>
        <hr />
        <p className="widget-reminders-value">{lines}</p>
        <p className="widget-reminders-value">{status}</p>
        {this.state.updatedAt && <p className="widget__updatedAt">{this.state.updatedAt}</p>}
      </div>
    );
  }
}

ManchesterTramsWidget.propTypes = {
  format: PropTypes.string,
};
