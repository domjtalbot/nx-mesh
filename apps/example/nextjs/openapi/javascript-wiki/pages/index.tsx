import type { GetStaticProps, NextPage } from 'next';
import type { JavascriptWiki } from '@nx-mesh/example/sdk/openapi/javascript-wiki';

import { isAvailability } from '@nx-mesh/example/sdk/openapi/javascript-wiki/utils';

import styles from './index.module.css';

type PageData = JavascriptWiki.feed_availability_queryQuery;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import(
    '@nx-mesh/example/sdk/openapi/javascript-wiki/sdk'
  );
  const data = await getMeshSDK().feed_availability_query();

  return {
    props: data,
    revalidate: 60 * 60 * 24 * 31, // 1 month
  };
};

export const Index: NextPage<PageData> = (props) => {
  const inTheNews = isAvailability(props.feed_availability)
    ? props.feed_availability?.in_the_news
    : undefined;

  return (
    <div className={styles.page}>
      <h1>JavaScript Wiki</h1>
      <ul>
        {inTheNews?.map((wiki) => (
          <li key={wiki} data-wiki={wiki}>
            {wiki}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
