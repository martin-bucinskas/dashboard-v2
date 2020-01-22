// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import BaseWidget from '../base';
//
// import './styles.scss';
//
// export default class RemindersWidget extends BaseWidget {
//   constructor(props) {
//     super(props);
//     this.state = { value: undefined };
//   }
//
//   render() {
//     const classList = classNames(...this.classList, 'widget__text');
//
//     const reminders = [];
//     if (typeof this.state.value !== 'undefined' && this.state.value !== []) {
//       this.state.value.forEach((i, reminder) => {
//         const entry = <p key={`reminder${i}`}>{reminder}</p>;
//         reminders.push(entry);
//       });
//     }
//
//     return (
//       <div className={classList}>
//         <h1 className="widget__title">{this.props.title}</h1>
//         <hr />
//         <p className="widget-reminders-value">{reminders.forEach(reminder => (reminder))}</p>
//       </div>
//     );
//   }
// }
//
// RemindersWidget.propTypes = {
//   format: PropTypes.string,
// };

import React from 'react';
import classNames from 'classnames';
import BaseWidget from '../base';

import './styles.scss';
import PropTypes from 'prop-types';

export default class RemindersWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.state = { value: undefined };
  }

  render() {
    const classList = classNames(...this.classList, 'widget__text');

    const reminders = [];
    if (typeof this.state.value !== 'undefined' && this.state.value.length > 0) {
      this.state.value.forEach(news => {
        const entry = (
          <div>
            <div key={`reminders-${news.heading}`}>
              <strong>{news.heading}</strong>: <br />{news.content}
            </div>
            <br />
          </div>
        );
        reminders.push(entry);
      });
    } else {
      const entry = (
        <div key="reminders-no-news">
          No reminders...
        </div>
      );
      reminders.push(entry);
    }

    return (
      <div className={classList}>
        <h1 className="widget__title">Reminders</h1>
        <hr />
        <div className="widget-reminders-value">{reminders}</div>
      </div>
    );
  }
}

RemindersWidget.propTypes = {
  format: PropTypes.string,
};
