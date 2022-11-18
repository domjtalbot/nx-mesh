import type { GetStaticProps, NextPage } from 'next';
import type { Trippin } from '@nx-mesh/example/sdk/odata/trippin';

type PageData = Trippin.getAirportsQuery;

export const getStaticProps: GetStaticProps<PageData> = async () => {
  const { getMeshSDK } = await import('@nx-mesh/example/sdk/odata/trippin/sdk');

  const data = await getMeshSDK().getAirports();

  return {
    props: data,
    revalidate: 60 * 60 * 24 * 31, // 1 month
  };
};

export const TrippinRoute: NextPage<PageData> = (props) => {
  return (
    <>
      <h1>TripPin</h1>
      <ul>
        {props.Airports?.map(({ Name, Location }) => (
          <li key={Name} data-airport={Name}>
            {Name} - {Location.City?.Name}, {Location.City?.Region},{' '}
            {Location.City?.CountryRegion}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TrippinRoute;
