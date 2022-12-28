import styled from "@emotion/styled";

export const StyledFooter = styled.div`
  display: flex;
  background-color: var(--color--primary-dark);
  padding: 36px 0 22px;
`

export const StyledFooterWrapper = styled.div`
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
  width: 100%;
  color: var(--color--background);
  
  a {
    padding: 0;
    margin: 0;
  }
  
  .default-default-footer__home {
    padding: 0;
    color: var(--color--background);
  }
`

export const StyledLink = styled.a`
    padding: 0;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    color: var(--color--background);
    text-decoration: underline;
    display: inline-block;
    position: relative;
    margin-bottom: -1px;
`

export const StyledCopyright = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: #9E8567;
  align-self: flex-end;
`

export const StyledAuthorsMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
`

export const StyledAuthorLink = styled.a`
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: #FFFCF7;
  padding: 0;
  
  span {
    text-decoration: underline;
  }
`

export const StyledDeveloped = styled.div`
  position: absolute;
  right: 101px;
  pointer-events: none;
  display: inline;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  text-align: right;
  color: #FFFCF7;
  padding: 0;
  width: 77px;
`