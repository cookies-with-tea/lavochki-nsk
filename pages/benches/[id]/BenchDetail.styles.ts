import styled from '@emotion/styled'

export const StyledSubtitle = styled.div`
  font-size: 20px;
  line-height: 20px;
  color: var(--color--light-secondary);
  
  &:first-of-type {
    margin-right: 20px !important;
  }
`

export const StyledSubtitleAuthor = styled.span`
  font-size: 20px;
  line-height: 20px;
  color: var(--color--light-secondary);
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color--light-secondary);
  }
`

export const StyledTag = styled.div`
    font-size: 22px;
    line-height: 24px;
    color: var(--color--primary-dark);
    border: 1px solid var(--color--primary-dark);
    border-radius: 100px;
  padding: 8px 16px;
  
  &:not(:last-of-type) {
    margin-right: 14px;
  }
`
