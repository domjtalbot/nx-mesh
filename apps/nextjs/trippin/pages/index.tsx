import type { GetStaticProps, NextPage } from 'next';
import type { Airlines_queryQuery } from '@nx-plugin-graphql-mesh/sdk/trippin';

import styles from './index.module.css';

type PageData = Airlines_queryQuery;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import('@nx-plugin-graphql-mesh/sdk/trippin');

  const data = await getMeshSDK().Airlines_query();

  return {
    props: data,
    revalidate: 60 * 60 * 24 * 31, // 1 month
  };
};

export const Index: NextPage<PageData> = (props) => {
  return (
    <div className={styles.page}>
      <ul>
        {props.Airlines?.map((airline) => (
          <li key={airline.AirlineCode} data-airline={airline.Name}>
            {airline.Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
