import React, {FC} from 'react';
import TheMenu from "@/utils/TheModal";

const TheHeaderMenu: FC<any> = ({ setShowModal, className }): JSX.Element => {
    return (
        <Theenu className={className}>
            <div className="the-header-menu">
                Im a modal!
                <button
                    style={{ background: "papyawhip" }}
                    onClick={() => setShowModal(false)}
                >
                    close
                </button>
            </div>
        </Theenu>
    );
};

export default TheHeaderMenu;