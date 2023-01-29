import { Box, Grow, Skeleton } from '@mui/material'
import { FC, ReactElement } from 'react'

interface IProps {
  isBenchFetching: boolean
}

const BenchCardSkeleton: FC<IProps> = ({ isBenchFetching }): ReactElement => {
  return (
    <Grow
      in={isBenchFetching}
      style={{
        transitionDelay: isBenchFetching ? '150ms' : '0ms',
      }}
      unmountOnExit
    >
      <Box sx={{ width: '300px', height: '400px', backgroundColor: 'rgba(255,245,238,0.84)', borderRadius: '20px'  }}>
        <Skeleton animation={'wave'} width={300} height={200} sx={{ transform: 'scale(1, 1)', borderRadius: '20px 20px 0 0' }} />
        <Box sx={{ padding: '32px 38px 32px 32px' }}>
          <Skeleton animation={'wave'} width={'100%'} height={22} sx={{ transform: 'scale(1, 1)', marginBottom: '34px' }} />
          <Skeleton animation={'wave'} width={'100%'} height={35} sx={{ transform: 'scale(1, 1)', marginBottom: '18px' }} />
          <Box className={'d-f jc-sb ai-c'}>
            <Skeleton animation={'wave'} width={108} height={32} sx={{ transform: 'scale(1, 1)' }} />
            <Skeleton animation={'wave'} width={96} height={18} sx={{ transform: 'scale(1, 1)' }} />
          </Box>
        </Box>
      </Box>
    </Grow>

  )
}

export default BenchCardSkeleton