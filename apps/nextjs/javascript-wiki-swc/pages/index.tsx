import type { GetStaticProps, NextPage } from 'next';
import type { availability_queryQuery } from '@nx-plugin-graphql-mesh/sdk/javascript-wiki-swc';

import styles from './index.module.css';

type PageData = availability_queryQuery;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import(
    '@nx-plugin-graphql-mesh/sdk/javascript-wiki-swc'
  );

  const data = await getMeshSDK().availability_query();

  return {
    props: data,
    revalidate: 60 * 60 * 24 * 31, // 1 month
  };
};

export const Index: NextPage<PageData> = (props) => {
  return (
    <div className={styles.page}>
      <h1>JavaScript Wiki</h1>
      <ul>
        {props.availability?.inTheNews?.map((wiki) => (
          <li key={wiki} data-wiki={wiki}>
            {wiki}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
