import { useState, useEffect } from 'react';
import CurrencyLayerClient from 'currencylayer-client';

export const useCurrencyLayer = (params, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const client = new CurrencyLayerClient({apiKey: '531d6475cefb59a4563e9acbef4b0559'});
    if (params && params.dates) {
      const result = [];
      params.dates.forEach((date) => {
        const requestedParams = {currencies: params.currencies, date}
        client.historical(requestedParams).then(response => {
          if (!response.success) {
            throw new Error('Failed to fetch.');
          } else {
            result.push({ date, currencyValues: response.quotes})
          }

        }).then(() => {
          if (result.length === 7) {
            const sortedResult = result.slice().sort((a, b) => {
              var aa = a.date.split('-').reverse().join(),
                  bb = b.date.split('-').reverse().join();
              return aa < bb ? -1 : (aa > bb ? 1 : 0);
          });
            setFetchedData(sortedResult)
            return setIsLoading(false);
          }
        }
          )
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
      })
    }
  }, dependencies);

  return [isLoading, fetchedData];
};
