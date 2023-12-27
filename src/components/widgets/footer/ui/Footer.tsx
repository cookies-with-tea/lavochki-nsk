import styles from './styles.module.scss'
import { Button, Icon } from '@/components/shared'
import Link from 'next/link'
import cn from 'classnames'

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={cn(styles['footer__wrapper'])}>
        <div className={styles['footer__info']}>
          <Link href={'/'}>
            <Icon name={'logo'} width={260} height={32} />
          </Link>

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
              <Icon name={'vk'} />
            </Link>

            <Link className={styles['footer__contacts-socials-item']} href='#'>
              <Icon name={'telegram-rect'} />
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
