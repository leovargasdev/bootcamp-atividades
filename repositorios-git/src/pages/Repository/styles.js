import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 2px solid #eee;
    border-radius: 4px;
    & + li {
      margin-top: 7px;
    }
    &:hover {
      background: #2e1f5f;
      color: white;
      cursor: pointer;

      a {
        color: white;
      }
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;
      }

      &:hover {
        color: #7159c1;
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }
`;

export const ButtonFilterIssue = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  button {
    font-size: 15px;
    flex: 1;
    height: 40px;
    background: #7159c1;
    color: white;
    border: 0;
    padding: 0px 15px;
    margin-left: 10px;
    border-radius: 4px;
  }
`;

export const ButtonControllerPages = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;

export const ControlPagesButton = styled.button.attrs(props => ({
  type: 'button',
  disabled: props.firsPage === 1,
}))`
  flex: 1;
  height: 38px;
  background: #2e1f5f;
  border: 0;
  padding: 0px 15px;
  margin-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  span {
    font-size: 16px;
    letter-spacing: 1.3px;
    color: white;
    font-weight: bold;
    margin-right: 10px;
  }
`;
