import styles from './styles.module.scss'
import { generateClassNames } from '@/shared/lib/utils'
import { Button, Icon } from '@/components/shared'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={generateClassNames([styles['footer__wrapper']])}>
        <div className={styles['footer__info']}>
          <Button appearance={'link'} as={Link} href={'/'}>
            <Icon name={'logo'} width={260} height={32} />
          </Button>

          <div className={styles['footer__policy']}>
            <span>Ознакомиться с&nbsp;</span>

            <Button appearance={'link-underline'} as={Link} href={'#'}>
              Политикой сайта
            </Button>
          </div>
        </div>

        <p className={styles['footer__copyright']}>
          Copyright © 2022 Lavochki NSK
        </p>

        <div className={styles['footer__contacts']}>
          <div className={styles['footer__contacts-socials']}>
            <Link className={styles['footer__contacts-socials-item']} href='#'>
              <Icon name={'vk'} width={48} height={48} className="mr-22"/>
            </Link>

            <Link className={styles['footer__contacts-socials-item']} href='#'>
              <Icon name={'telegram-rect'} width={48} height={48} />
            </Link>
          </div>

          <nav className={styles['footer__development']}>
            <ul>
              <li className={styles['footer__developer']}>
                <span>
                  Developed by &nbsp;
                </span>

                <Link passHref href="#">
                  Андрей Падерин
                </Link>
              </li>

              <li className={styles['footer__developer']}>
                <Link passHref href="#">
                  Александр Никифоров
                </Link>
              </li>

              <li className={styles['footer__developer']}>
                <Link passHref href="#">
                  Анастасия Ищенко
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
