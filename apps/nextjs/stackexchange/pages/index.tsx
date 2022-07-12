import type { GetStaticProps, NextPage } from 'next';
import type { listFeaturedQuestions_queryQuery } from '@nx-plugin-graphql-mesh/sdk/stackexchange';

import styles from './index.module.css';

export const getStaticProps: GetStaticProps<
  listFeaturedQuestions_queryQuery
> = async () => {
  const { getMeshSDK } = await import(
    '@nx-plugin-graphql-mesh/sdk/stackexchange'
  );

  const data = await getMeshSDK().listFeaturedQuestions_query();

  return {
    props: data,
    revalidate: 60,
  };
};

export const Index: NextPage<listFeaturedQuestions_queryQuery> = (props) => {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>Featured GraphQL Questions</h1>
          </div>

          <div id="questions">
            {props.listFeaturedQuestions?.items?.map((question) => (
              <div
                id="nx-cloud"
                className="rounded shadow"
                data-question
                data-question-id={question.questionId}
                key={question.questionId}
              >
                <div>
                  <h2>{question.title}</h2>
                </div>
              </div>
            ))}
          </div>

          <p id="love">
            Carefully crafted with
            <svg
              fill="currentColor"
              stroke="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
