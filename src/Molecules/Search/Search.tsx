import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Fields } from 'ui/molecules';

const SearchInput = styled.div`
  ${({ withoutMarginRight }) => (withoutMarginRight ? '' : 'margin-right: 16px;')}
`;

export default function Search(props) {
  const { width, withoutMarginRight } = props;

  const [q, setQ] = useState(props.value);

  const handleSearch = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter') {
      props.onSearch(val);
    }
  };

  useEffect(() => {
    setQ(props.value);
  }, [props.value]);

  return (
    <>
      <SearchInput withoutMarginRight={withoutMarginRight}>
        <Fields.Text
          data-cy={props.datacy}
          id="input-text"
          name="input-text"
          style={{ margin: 0, height: 32 }}
          placeholder={props.placeholder}
          onKeyPress={handleSearch}
          icon="search"
          width={width}
          onChange={(e) => setQ(e.target.value)}
          value={q}
        />
      </SearchInput>
    </>
  );
}
