import type { GetStaticProps, NextPage } from 'next';
import type {
  DailyForecastFragment,
  Error,
} from '@nx-mesh/example/sdk/weatherbit';

import { isError as isSdkError } from '@nx-mesh/example/sdk/weatherbit';

import styles from './index.module.css';

type PageData = DailyForecastFragment | Error;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import('@nx-mesh/example/sdk/weatherbit');

  const data = await getMeshSDK().getDailyForecastByCoordinates({
    lat: 52.854347,
    lng: -3.88708,
    apiKey: process.env['NX__WEATHERBIT__API_KEY'],
  });

  return {
    props: data.forecastData,
    revalidate: 60,
  };
};

export const Index: NextPage<PageData> = (props) => {
  const isError = isSdkError(props);

  return (
    <div className={styles.page}>
      {isError && (
        <div>
          <p>An error occurred</p>
          <p>Code: {props.code}</p>
          <p>Message: {props.message}</p>
        </div>
      )}

      {!isError && (
        <>
          <div className={styles.headingWrapper}>
            <h1 className={styles.heading}>Daily Forecast</h1>
            <h2 className={styles.subHeading}>
              {props.cityName}, {props?.countryCode}
            </h2>
          </div>

          <ul className={styles.weatherList}>
            {props.data?.map((item) => (
              <li
                className={styles.weatherList__item}
                key={item?.datetime}
                data-daily-forecast={item?.datetime}
              >
                <ul className={styles.weatherList__item__list}>
                  {Object.keys(item).map((key) => {
                    const value = item[key];

                    if (value === null) return;

                    return (
                      <li key={key}>
                        <span className={styles.weatherList__item__key}>
                          {key}
                        </span>
                        :{' '}
                        <span className={styles.weatherList__item__value}>
                          {value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Index;
