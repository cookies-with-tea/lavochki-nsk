import React, { FC, ReactElement, useEffect } from 'react'

import { StyledLoginButton, StyledTelegramWrapper } from '@/app/components/Layouts/DefaultLayout/DefaultLayoutHeader/DefaultLayoutHeaderAuthButton/DefaultLayoutHeaderAuthButton.style'
import CommonIcon from '@/app/components/Common/ui/CommonIcon/CommonIcon'
import { UserType } from '@/app/types/user.type'

interface IProps {
  onAuth: (user: UserType) => void
}

const DefaultLayoutHeaderAuthButton: FC<IProps> = ({ onAuth }): ReactElement => {
  const handleLogin = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window?.Telegram?.Login.auth({
      bot_id: process.env.BOT_ID,
      request_access: true
    }, (data: UserType) => {
      onAuth(data)
    })
  }

  useEffect(() => {
    const body = document.body

    const script = document.createElement('script')

    script.src = 'https://telegram.org/js/telegram-widget.js?27'

    script.async = true

    body.appendChild(script)
  }, [])

  return (
    <StyledTelegramWrapper onClick={handleLogin}>
      <StyledLoginButton>
        <div className="text">
          Войти
        </div>
        <CommonIcon name={'telegram'} width={62} height={62} />
      </StyledLoginButton>
    </StyledTelegramWrapper>
  )
}

export default DefaultLayoutHeaderAuthButton