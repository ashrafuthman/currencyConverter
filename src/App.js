import React from 'react';

import CurrencyPicker from './components/CurrencyPicker';

const App = () => {
  const lastWeekDatesArr = [];
  const lastWeekDates = () => {
    [0,1,2,3,4,5,6].forEach((d) => {
      const today = new Date();
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - d);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formatedDay = Number(day) >= 10 ? day : '0' + day;
      const formatedMonth = Number(month) >= 10 ? month : '0' + month;
      const historicalDate = [year, formatedMonth, formatedDay].join('-');
      lastWeekDatesArr.push(historicalDate);
    })
  };

  lastWeekDates()

  let content = <p>Loading ...</p>

  if (lastWeekDatesArr.length === 7) {
    content = (
      <React.Fragment>
        <CurrencyPicker dates={lastWeekDatesArr.reverse()} />
      </React.Fragment>
    );
  }

  return content;
};

export default App;
