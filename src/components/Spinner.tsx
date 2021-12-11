import styled from "styled-components";

export const Spinner = styled.div<{ size?: string; color?: string }>`
  display: inline-block;
  width: ${(p) => p.size || "36px"};
  height: ${(p) => p.size || "36px"};
  border: 3px solid ${(p) => p.color || "rgba(0,0,0,.5)"};
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
