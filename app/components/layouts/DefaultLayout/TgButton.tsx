import React, {FC, useEffect, useRef} from 'react';
import CommonIcon from "@/app/components/Common/CommonIcon";
import {StyledTelegram} from "@/app/components/layouts/DefaultLayout/DefaultLayoutHeader/styles";

const TgButton: FC<any> = ({ dataOnauth }): JSX.Element => {
    const button = useRef(null)

    useEffect(() => {

        const script = document.createElement("script")
        const script2 = document.createElement('script')
        const script3 = document.createElement('script')
        const iFrame = document.createElement('iframe')

        if (button && button.current) {
            const b = button.current as HTMLButtonElement
            b.setAttribute('onclick', 'return TWidgetLogin.auth();')
        }

        script.setAttribute('src', 'https://telegram.org/js/widget-frame.js?60')

        script2.innerHTML = 'TWidgetLogin.init("widget_login", 5069346557, {"origin":"http:\/\/127.0.0.1","embed":1,"request_access":"write","lang":"en","return_to":"http:\/\/127.0.0.1\/"}, false);'

        iFrame.setAttribute('src', 'http://127.0.0.1/')

        // script3.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?9')
        script.setAttribute('data-telegram-login', 's1veme_timetable_bot')
        // script3.setAttribute('data-size', 'large')
        script.setAttribute('data-request-access', 'write')
        // script3.setAttribute('data-onauth', 'onTelegramAuth(user)')
        // script3.setAttribute('data-userpic', 'false')
        script3.async = true


        document.body.appendChild(script)
        document.body.appendChild(script3)

        // iFrame.appendChild(script);

        setTimeout(() => {
            document.body.appendChild(script2);
        }, 2000)


        return () => {
            document.body.removeChild(iFrame)
            document.body.removeChild(script3)
            document.body.removeChild(script);
            document.body.removeChild(script2);

        }

    }, [])

    return (
        <>
            <StyledTelegram id="widget_login" ref={button} className="default-layout-header__telegram btn tgme_widget_login_button">
                <CommonIcon name="telegram" width={62} height={62} />
            </StyledTelegram>
        </>
    );
};

export default TgButton;