function SplitTimes({ data }) {
    return (
        <div>
            <h2>Strekktider</h2>

            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default SplitTimes;