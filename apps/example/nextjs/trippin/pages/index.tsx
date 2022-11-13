import type { GetStaticProps, NextPage } from 'next';
import type { Trippin } from '@nx-mesh/example/sdk/trippin';

import styles from './index.module.css';

type PageData = Trippin.getAirportsQuery;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import('@nx-mesh/example/sdk/trippin/sdk');

  const data = await getMeshSDK().getAirports();

  return {
    props: data,
    revalidate: 60 * 60 * 24 * 31, // 1 month
  };
};

export const Index: NextPage<PageData> = (props) => {
  return (
    <div className={styles.page}>
      <h1>TripPin</h1>
      <ul>
        {props.Airports?.map(({ Name, Location }) => (
          <li key={Name} data-airport={Name}>
            {Name} - {Location.City?.Name}, {Location.City?.Region},{' '}
            {Location.City?.CountryRegion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
