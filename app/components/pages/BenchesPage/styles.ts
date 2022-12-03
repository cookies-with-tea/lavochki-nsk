import styled from "@emotion/styled";
import {Button, FormControlLabel} from "@mui/material";

export const StyledBenchesPage = styled.div`
  min-height: calc(100vh - 22rem);
`

export const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const StyledSortTitle = styled.p`
  font-size: 22px;
  line-height: 30px;
  color: var(--color--primary-dark);
  margin-right: 40px;
`

export const StyledSortItem = styled.li`
  font-size: 22px;
  line-height: 1;
  color: var(--color--primary-dark);
  position: relative;
  border-bottom: 1px dashed var(--color--primary-dark);
  cursor: pointer;
  
  &:not(:last-child) {
    margin-right: 53px;
  }
`

export const StyledAside = styled.aside`
    width: 350px;
`

export const StyledResetButton = styled(Button)`
  font-family: 'Poppins', sans-serif !important;
  font-size: 16px !important;
  line-height: 1 !important;
  color: var(--color--light-secondary) !important;
  border: none !important;
  padding: 0 !important;
  text-transform: capitalize;
  border-radius: 0 !important;
  border-bottom: 1px dashed var(--color--primary-dark) !important;
  
  &:hover {
    background-color: transparent !important;
  }
`

export const StyledFilterTitle = styled.h4`
  line-height: 19px;
`

export const StyledFormControlRadioLabel = styled(FormControlLabel)`
  padding: 0 !important;
  
  .MuiRadio-root {
    padding: 0 !important;
    margin-right: 14px;
  }
  
  .MuiTypography-root {
    font-size: 22px;
    line-height: 26px;
    color: var(--color--primary-dark);
  }
  
  .MuiSvgIcon-root {
    color: var(--color--primary-dark);
    width: 26px;
    height: 26px;
    
    &:first-child {
      outline: 1px solid var(--color--primary-dark);
      border-radius: 50%;
      
      path {
        display: none;
      }
    }
  }
  
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`

export const StyledShowAllButton = styled(Button)`
  font-size: 16px !important;
  line-height: 26px !important;
  color: var(--color--primary-dark) !important;
  text-decoration: underline;
  border: none !important;
  text-transform: capitalize;
  padding: 0 !important;
  display: block;
  text-align: left !important;
  margin-bottom: 54px !important;
`

export const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`