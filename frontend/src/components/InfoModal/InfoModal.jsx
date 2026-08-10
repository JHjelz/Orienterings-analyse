import "./InfoModal.css";
import { useState } from "react";

function InfoModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="info-button" onClick={() => setIsOpen(true)}>
                (i)
            </button>

            {isOpen && (
                <div className="modal-backdrop">
                    <div className="info-modal">
                        <h2>Om Orienterings-analyse</h2>

                        <p>
                            Her kan du analysere orienteringsdata fra ulike kilder.
                        </p>

                        <button className="info-button" onClick={() => setIsOpen(false)}>
                            Lukk
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default InfoModal;