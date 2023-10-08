import { FTelegramAuth } from 'features/telegram-auth'

import { SButton, SCheckbox, SIcon, SInput } from 'shared/ui'

export const UIKitPage = () => {
    return (
      <div className='ui-kit container'>
        <h1>UI Kit</h1>

        <div className={'d-flex mb-48'}>
          <SButton className={'mr-16'} postfixIcon={<SIcon name={'close'} />} >Default</SButton>
          <SButton appearance={'primary'}>Войти</SButton>
          <SButton appearance={'link'} className={'ml-16'}>Забыли пароль</SButton>

          <SIcon name={'close'} reverse
className={'ml-16'} />
        </div>

        <div className={'mb-48'}>
          <SCheckbox label='Привет' />
        </div>

        <div className={'mb-48'}>
          <FTelegramAuth />
        </div>

        <div className="container">
          <SInput placeholder={'Placeholder'} />
        </div>

        <div className="container">
          <SInput type='password' placeholder={'Placeholder'} />
        </div>
      </div>
    )
}
