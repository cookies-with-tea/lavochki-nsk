import { render, screen } from '@testing-library/react'
import { Button } from '@/components/shared'
import { expect, jest, describe, it } from '@jest/globals'
import { userEvent } from '@testing-library/user-event'

describe('button', () => {
  it('should be click', async () =>  {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Content</Button>)

    await userEvent.click(screen.getByText('Content'))

    expect(onClick).toHaveBeenCalled()
  })
})
