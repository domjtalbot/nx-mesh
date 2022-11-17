import Link from 'next/link';
import styled from 'styled-components';

const StyledPage = styled.div`
  .page {
  }
`;

export function Index() {
  return (
    <StyledPage>
      <h1>Nx Mesh Examples</h1>
      <nav>
        <ul>
          <li>
            <Link href="/sources/odata/trippin">odata - trippin</Link>
          </li>
          <li>
            <Link href="/sources/openapi/javascript-wiki">
              openapi - javascript-wiki
            </Link>
          </li>
          <li>
            <Link href="/sources/soap/country-info">soap - country info</Link>
          </li>
        </ul>
      </nav>
    </StyledPage>
  );
}

export default Index;
