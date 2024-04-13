import { configure, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import CnHeader from '#widgets/header'

configure({ testIdAttribute: 'data-tid' })

describe('button', () => {
  it('should be click', async () =>  {
    render(<CnHeader />)

    expect(screen.getByTestId('cn-header')).not.toBeUndefined()
  })
})
