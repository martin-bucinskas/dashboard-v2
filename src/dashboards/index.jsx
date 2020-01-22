import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/default.scss';

import Dashboard from '../widgets/dashboard';
import RemindersWidget from '../widgets/reminders/widget';
import WeatherWidget from '../widgets/weather/widget';
import LondonUndergroundWidget from '../widgets/london-underground/widget';
import WifiWidget from '../widgets/wifi/widget';
import TeamNewsWidget from '../widgets/team-news/widget';
import OverheardWidget from '../widgets/overheard/widget';
// import Gallery from '../widgets/gallery/widget';

ReactDOM.render(
  <Dashboard name="Dashboard">
    <RemindersWidget name="Reminders" title="Reminders" size="medium" />
    <OverheardWidget name="Overheard" size="medium" />
    <WeatherWidget name="WeatherWidget" />
    <LondonUndergroundWidget name="LondonUnderground" size="medium" />
    <WifiWidget name="WiFi" />
    {/*<Gallery name="Gallery" size="medium" />*/}
    <TeamNewsWidget name="TeamNews" size="medium" />
  </Dashboard>,
  document.getElementById('content'),
);
