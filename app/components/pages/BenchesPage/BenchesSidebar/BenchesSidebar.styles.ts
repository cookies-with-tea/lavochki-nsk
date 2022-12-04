import styled from "@emotion/styled";
import {Button, Checkbox, Chip, FormControlLabel} from "@mui/material";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";

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
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  
  &:not(:last-child) {
    margin-right: 53px;
  }
`

export const StyledAside = styled.aside`
    width: 350px;
    margin-top: 114px;
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
    
    &:first-of-type {
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
`

export const StyledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
`

export const StyledChip = styled(Chip)`
  border-radius: 20px;
  font-size: 14px !important;
  line-height: 18px !important;
  color: #49260A;
  padding: 7px 13px !important;
  
  .MuiChip-label {
    padding: 0 !important;
  }

  &.MuiChip-outlinedDefault {
    border: 1px solid var(--color--primary-dark);
  }
  
  &.MuiChip-filled {
    background-color: var(--color--primary-dark);
    color: #FFFCF7;
  }
`

export const StyledIcon = styled.div`
    border: 1px solid var(--color--primary-dark);
    border-radius: 10px;
    width: 32px;
    height: 32px;
`

export const StyledCheckedIconWrapper = styled.div`
  border: 1px solid var(--color--primary-dark);
  border-radius: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledCheckedIcon = styled(CommonIcon)`
  border: 1px solid var(--color--primary-dark);
  border-radius: 10px;
`

export const StyledCheckbox = styled(Checkbox)`
padding: 0 !important;
`

export const StyledFormControlLabel = styled(FormControlLabel)`
margin-bottom: 12px;
  padding-left: 10px;
  
  .MuiTypography-root {
    font-size: 22px;
    line-height: 30px;
    color: var(--color--primary-dark);
    margin-left: 14px;
  }
`