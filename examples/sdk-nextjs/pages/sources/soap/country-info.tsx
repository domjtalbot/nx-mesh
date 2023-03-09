import type { GetStaticProps, NextPage } from 'next';
import { CountryInfo } from '@nx-mesh/examples-sdk-soap--country-info';

type PageData = CountryInfo.GetLanguagesQuery | undefined;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import(
    '@nx-mesh/examples-sdk-soap--country-info/sdk'
  );

  const data = await getMeshSDK().GetLanguages();

  return {
    props: data,
    revalidate: 2, // 60 * 60 * 24 * 31, // 1 month
  };
};

export const CountryInfoRoute: NextPage<PageData> = (props) => {
  return (
    <div>
      <div>
        <h1>Languages</h1>
      </div>

      <ul>
        {props.CountryInfoService_CountryInfoService_CountryInfoServiceSoap_ListOfLanguagesByName?.ListOfLanguagesByNameResult.tLanguage.map(
          (item) => (
            <li key={item?.sISOCode} data-language={item?.sISOCode}>
              {item?.sName}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CountryInfoRoute;
