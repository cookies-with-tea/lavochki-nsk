import styled from "@emotion/styled";
import {Button, Menu, MenuItem} from "@mui/material";

export const StyledLink = styled.div`
  border: none;
  font-size: 22px !important;
  line-height: 33px !important;
  color: var(--color--primary-dark);
  padding: 0 !important;
`

export const StyledMenuItem = styled(MenuItem)`
  padding: 10px 24px 10px 20px;
  background-color: var(--color--primary);

  &:not(:last-child) {
    margin-bottom: 2px;
  }

  &:hover {
    background-color: #d5ac7b;
  }
`

export const StyledLogoutButton = styled(Button)`
  border: none !important;
  font-size: 22px !important;
  line-height: 33px !important;
  color: var(--color--primary-dark);
  text-transform: capitalize;
  padding: 0 !important;
`

export const StyledMenu = styled(Menu)`
    transform-origin: 0 0 !important;
`