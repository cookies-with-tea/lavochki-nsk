import styled from "@emotion/styled";
import {Button, MenuItem} from "@mui/material";

export const StyledLink = styled.div`
  border: none;
  font-size: 22px !important;
  line-height: 33px !important;
  color: var(--color--primary-dark);
  padding: 0 !important;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

export const StyledMenuItem = styled(MenuItem)`
  padding: 10px 24px 10px 20px;
  background-color: var(--color--primary);
  width: 238px;
  transition: background-color 0.15s ease-out;

  &:not(:last-child) {
    margin-bottom: 2px;
  }

  &:hover {
    background-color: #d5ac7b;

    .menu__link {
      color: #9d4e05;
    }
  }
`

export const StyledLogoutButton = styled(Button)`
  border: none !important;
  font-size: 22px !important;
  line-height: 33px !important;
  color: var(--color--primary-dark);
  text-transform: capitalize;
  padding: 0 !important;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`
