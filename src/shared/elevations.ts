import { css } from 'styled-components';

const getElevation = (dp: number) => {
  switch (dp) {
    case 0: {
      return css`
        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.039), 0px 0.85px 3px rgba(0, 0, 0, 0.19);
      `;
    }
    case 2: {
      return css`
        box-shadow: 0px 0.25px 1px rgba(0, 0, 0, 0.039), 0px 0.85px 3px rgba(0, 0, 0, 0.19);
      `;
    }

    case 4: {
      return css`
        box-shadow: 0px 0.5px 1.75px rgba(0, 0, 0, 0.039), 0px 1.85px 6.25px rgba(0, 0, 0, 0.19);
      `;
    }

    default: {
      return css``;
    }
  }
};
export default getElevation;
