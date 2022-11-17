import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '@ravenry/ui';
import { Empty } from 'ui/molecules';
import colors from 'ui/colors';

const Table = styled.div`
  width: 100%;
`;

const TH = styled.div`
  width: 40%;
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${colors.black60};
`;

const TR = styled.div`
  margin-top: 16px;
  display: flex;
  padding: 16px;
  width: 100%;
  flex-direction: column;
  color: ${colors.black100};
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.semiWhite};
  }
`;

const TD = styled.div`
  width: 60%;
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CardTableMobile({ widths, header, items, emptyText, minHeight }) {
  return (
    <Container
      borderRadius="10px"
      fluid
      color="white"
      padding="12px 16px 16px 16px"
      style={{ marginBottom: 40 }}
    >
      <Table minHeight={minHeight}>
        {items.length > 0 ? (
          items.map(({ bold, data, to }, index) => (
            <Link to={to} key={index}>
              <TR key={index} bold={bold}>
                {data.map((item, index) => (
                  <div
                    key={'card-table-mobile-data-' + index}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <TH key={index} width={widths[index]}>
                      {header[index]}
                    </TH>
                    <TD key={index} width={widths[index]}>
                      {item}
                    </TD>
                  </div>
                ))}
              </TR>
            </Link>
          ))
        ) : (
          <EmptyContainer height={minHeight}>
            <Empty text={emptyText} img="treasure" />
          </EmptyContainer>
        )}
      </Table>
    </Container>
  );
}
