import styled from "@emotion/styled";

export const StyledFooter = styled.div`
  display: flex;
  background-color: var(--color--primary-dark);
  padding: 35px 0;
`

export const StyledFooterWrapper = styled.div`
  padding: 15px 0;
  max-width: 1340px;
  margin-inline: auto;
  font-size: 16px;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  width: 100%;
  color: var(--color--background);
  
  .default-default-footer__home {
    padding: 0;
  }
`

export const StyledLink = styled.a`
    padding: 0;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    color: var(--color--background);
    text-decoration: underline;
 
`