import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { HomeBenchSlider }
  from '@/app/components/pages/Home/HomeBench/HomeBenchSlider/HomeBenchSlider'

export const StyledHomeBenchesSlider = styled(HomeBenchSlider)`
  max-width: 740px;
  position: relative;
`

export const StyledLatestBench = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--color--primary-light);
  padding: 30px 0 26px 30px;
  margin-bottom: 40px;
  border-radius: 20px;
`

export const StyledLatestBenchInfoTitle = styled.div`
  font-weight: 500;
  font-size: 30px;
  line-height: 34px;
  color: var(--color--primary-dark);
  margin-bottom: 38px;
`

export const StyledLocationButton = styled(Button)`
  background: none;
  border: none !important;
  padding: 0 !important;
  transition: none !important;
  margin: 0;
  text-align: left !important;
  width: 24px !important;
  justify-content: flex-start;

  .MuiTouchRipple-root {
    display: none;
  }
  
  &:hover {
    background: none !important;
  }
`

export const StyledLatestBenchInfoLocation = styled.div`
  display: flex;
  margin-bottom: 17px;
`

export const StyledLatestBenchInfoLocationTitle = styled.div`
  font-size: 22px;
  line-height: 32px;
  font-weight: 500;
  color: var(--color--primary-dark);
  margin-right: 14px;
`

export const StyledLink = styled.a`
  padding: 14px 25px;
  font-size: 22px;
  line-height: 26px;
  width: 154px;
`