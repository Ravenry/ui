import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from "../../Atoms";
import { Empty } from '../index';
import colors from '../../shared/colors';

const Table = styled.div`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight || 'auto'};
`;

const THead = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const TH = styled.div`
  width: ${({ width }) => width || 'auto'};
  font-size: 0.75rem;
  line-height: 1rem;
`;

const TR = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  height: 36px;
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
  width: ${({ width }) => width || 'auto'};
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height || 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function CardTable({ widths, header, items, emptyText, minHeight }) {
  return (
    <Container borderRadius="10px" fluid color="white" padding="12px 16px 16px 16px">
      <Table minHeight={minHeight}>
        {header && (
          <THead>
            {header.map((head, index) => (
              <TH key={index} width={widths[index]}>
                {head}
              </TH>
            ))}
          </THead>
        )}
        {items.length > 0 ? (
          items.map(({ bold, data, to }, index) => (
            <Link to={to} key={index}>
              <TR key={index} bold={bold}>
                {data.map((item, index) => (
                  <TD key={index} width={widths[index]}>
                    {item}
                  </TD>
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
