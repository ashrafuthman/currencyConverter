import { useCurrencyLayer } from '../hooks/currencyLayer';
import './CurrencyPicker.css';
import Summary from './Summary';
import React, { useState } from 'react';

const CurrencyPicker = props => {
  const [selectedCurrency, setSelectedCurrency] = useState('USDEUR');
  const [isLoading, fetchedData] = useCurrencyLayer(
    { selectedCurrency, currencies: ['EUR','CHF'], dates: props.dates }, []);
  let currenciesList;
  const currencyValues = [];
  const currencyDate = [];

  const currencySelectHandler = event => {
      const currency = event.target.value;
      setSelectedCurrency(currency);
  };

  const currencyName = name => {
    let unwantedString = name.includes('EUR') ? 'EUR' : 'USD';
    return name.replace(unwantedString, '')
  };

  const currencyList = data => {
    return Object.keys(data.currencyValues).map((currency, index) => ({
      id: index + 1,
      name: currency,
    }));
  }

  const eurToChfOrUSDConverter = (data, selectedCurrency) => {
    return currencyName(selectedCurrency) === 'CHF' ?
    parseFloat(data.currencyValues[selectedCurrency] / data.currencyValues['USDEUR'])
      :
        parseFloat(1 / data.currencyValues[selectedCurrency]);
  }

  const fetchedDataHandler = event => {
    fetchedData && fetchedData.forEach((data, index) => {
      currenciesList = index === 6 && currencyList(data);
      let currencyValue = eurToChfOrUSDConverter(data, selectedCurrency);
      currencyValues.push((currencyValue).toFixed(3))
      let dateArr = data.date.split('-');
      let monthDayFormat =[dateArr[1], dateArr[2]].join('-');
      currencyDate.push(monthDayFormat);
    })
  };

  fetchedDataHandler();

  let content = <p>Loading Currencys...</p>;

  if (!isLoading && currenciesList && currenciesList.length > 0) {
    content = (
      <>
        <select
          onChange={currencySelectHandler}
          value={selectedCurrency}
        >
          {currenciesList.map(currency => (
            <option key={currency.id} value={currency.name}>
              {currencyName(currency.name)}
            </option>
          ))}
        </select>
        <br/>
        <Summary
          selectedCurrency={currencyName(selectedCurrency)}
          currencyValues={currencyValues}
          dates={currencyDate}
        />
      </>
    );
  } else if (
    !isLoading &&
    (!currenciesList || currenciesList.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CurrencyPicker;
