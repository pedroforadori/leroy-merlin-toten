import styled from "styled-components";

import theme from "../../styles/theme";

export const Container = styled.div`
  display: inline-block;
  margin: 0 0 25px 44px;

  span {
    color: ${theme.primaryDefault};
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    margin-left: 5px;
  }
`
