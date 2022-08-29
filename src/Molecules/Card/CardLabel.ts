import styled from 'styled-components';
import { isMobile } from 'react-device-detect';

import colors from '../../shared/colors';

const CardLabel = styled.div`
  font-size: 0.75rem;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: ${colors.black40};
  margin-right: 8px;
  width: ${isMobile && '100%'};
`;

export default CardLabel;
