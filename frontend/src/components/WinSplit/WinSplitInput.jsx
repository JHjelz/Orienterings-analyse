function WinSplitInput() {
    return (
        <div className="winsplit-input">
            <label htmlFor="winsplit-url">
                Gi inn WinSplit-lenke:
            </label>

            <input
                id="winsplit-url"
                type="text"
                className="winsplit-input-field"
                placeholder="https://..."
            />

            <button type="button" className="winsplit-button">
                Hent data
            </button>
        </div>
    );
}

export default WinSplitInput;