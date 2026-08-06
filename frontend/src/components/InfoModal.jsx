import { useState } from "react";

function InfoModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                (i)
            </button>

            {isOpen && (
                <div>
                    <h2>Om Orienterings-analyse</h2>

                    <p>
                        Her kan du analysere orienteringsdata fra ulike kilder.
                    </p>

                    <button onClick={() => setIsOpen(false)}>
                        Lukk
                    </button>
                </div>
            )}
        </>
    );
}

export default InfoModal;