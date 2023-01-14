import styled from "@emotion/styled";
import {ImageListItem} from "@mui/material";

export const StyledDetail = styled.div`
  padding: 5px 48px 36px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

export const StyledHeader = styled.div`
  padding: 13.5px;
  display: flex;
  justify-content: flex-end;
`

export const StyledTitle = styled.p`
  font-size: 28px;
  margin-bottom: 28px;
`

export const StyledLabel = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`
export const StyledText = styled.p`
  font-size: 18px;
  letter-spacing: 0.05em;
`

export const StyledListImage = styled(ImageListItem)`
  .MuiImageListItem-img {
    height: 100%;
  }
`