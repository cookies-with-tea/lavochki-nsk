import React, {FC} from 'react';
import TheModal from "@/utils/TheModal";

const TheHeaderMenu: FC<any> = ({ setShowModal, className }): JSX.Element => {
    return (
        <TheModal className={className}>
            <div className="the-header-menu">
                Im a modal!
                <button
                    style={{ background: "papyawhip" }}
                    onClick={() => setShowModal(false)}
                >
                    close
                </button>
            </div>
        </TheModal>
    );
};

export default TheHeaderMenu;