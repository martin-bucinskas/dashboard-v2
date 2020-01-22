import React from 'react';
import classNames from 'classnames';
import BaseWidget from '../base';

import './styles.scss';
import PropTypes from 'prop-types';

export default class TeamNewsWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = { value: undefined };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__text');

    const teamNews = [];
    if (typeof this.state.value !== 'undefined') {
      this.state.value.forEach(news => {
        const entry = (
          <div key={`team-news-${news.heading}`}>
            <strong>{news.heading}</strong>: {news.body}
          </div>
        );
        teamNews.push(entry);
      });
    }

    return (
      <div className={classList}>
        <h1 className="widget__title">Team News</h1>
        <hr />
        <div className="widget-reminders-value">{teamNews}</div>
      </div>
    );
  }
}

TeamNewsWidget.propTypes = {
  format: PropTypes.string,
};
