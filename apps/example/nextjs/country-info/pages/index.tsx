import type { GetStaticProps, NextPage } from 'next';
import { CountryInfo } from '@nx-mesh/example/sdk/country-info';

import styles from './index.module.css';

type PageData = CountryInfo.GetLanguagesQuery | undefined;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import('@nx-mesh/example/sdk/country-info/sdk');

  const data = await getMeshSDK().GetLanguages();

  return {
    props: data,
    revalidate: 2, // 60 * 60 * 24 * 31, // 1 month
  };
};

export const Index: NextPage<PageData> = (props) => {
  return (
    <div className={styles.page}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>Languages</h1>
      </div>

      <ul className={styles.weatherList}>
        {props.CountryInfoService_CountryInfoService_CountryInfoServiceSoap_ListOfLanguagesByName?.ListOfLanguagesByNameResult.tLanguage.map(
          (item) => (
            <li
              className={styles.weatherList__item}
              key={item?.sISOCode}
              data-language={item?.sISOCode}
            >
              {item?.sName}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Index;
