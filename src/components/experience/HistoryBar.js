import { useSelector } from "react-redux";

const HistoryBar = () => {
    const history = useSelector((state) => state.user.history);

    return (
        <div id="history-bar">
            History:
            <div id="history-list">
                {history.map(item => {
                    return <img src={item} />
                })}
            </div>
        </div>
    )
}

export default HistoryBar