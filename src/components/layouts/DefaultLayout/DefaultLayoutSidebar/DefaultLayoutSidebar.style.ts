import styled from "@emotion/styled";
import CommonIcon from "@/components/Common/CommonIcon/CommonIcon";
import {ListItem} from "@mui/material";
import {Link} from "react-router-dom";

export const StyledListItem = styled(ListItem)`
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    position: relative;
  width: 330px;
  
    &:hover {
      background-color: #a2d7e6 !important;
    }
    
    &.page-active {
      background-color: var(--color--primary-secondary);
      
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        height: 100%;
        border-radius: 1.5px;
        background-color: var(--color--primary);
      }
    }
`
export const StyledListIcon = styled(CommonIcon)`
  margin-right: 20px;
`

export const StyledListLink = styled(Link)`
  padding: 14px 30px 13px 30px;
  display: flex;
  align-items: center;
  width: 100%;
`