import { formatTime } from "./GeneralFunctions";

function SplitTable({ data, equalColumns = false, isModal = false }) {
  const { columns, rows } = data;

  const gridTemplateColumns = equalColumns
    ? columns.map(() => "25%").join(" ")
    : columns
        .map((column) => {
          switch (column.type) {
            case "name":
              return "160px";
            case "club":
              return "140px";
            case "split":
            case "time":
              return "110px";
            case "total":
            case "behind":
              return "120px";
            default:
              return "110px";
          }
        })
        .join(" ");

  function getCellClassName(columnType) {
    const classOne = `split-times-cell`;
    const classTwo = `split-times-${columnType}`;
    const classThree = `${columnType === "name" ? "split-times-runner-name" : ""}`;

    return `${classOne} ${classTwo} ${classThree}`;
  }

  function renderCell(column, row) {
    const value = row[column.key];

    switch (column.type) {
      case "name":
        return (
          <>
            <span className="split-times-position">
              {row.position ?? row.time?.position}
            </span>

            <span>{value}</span>
          </>
        );
      case "club":
        return value;
      case "split":
        if (!value) {
          return (
            <>
              <div className="split-times-split-time">-</div>
              <div className="split-times-split-time">-</div>
            </>
          );
        }
        return (
          <>
            <div className="split-times-split-time">
              {formatTime(value.split)}
            </div>
            <div className="split-times-cumulative">
              {formatTime(value.cumulative)}
            </div>
          </>
        );
      case "time":
        return formatTime(value.value);
      case "behind":
      case "total":
        return formatTime(value);
      default:
        return value;
    }
  }

  return (
    <div
      className={`split-times-table-wrapper ${
        isModal ? "split-times-table-wrapper-modal" : ""
      }`}
    >
      <div className="split-times-table">
        {/* HEADER */}
        <div
          className="split-times-row split-times-header-row"
          style={{ gridTemplateColumns }}
        >
          {columns.map((column) => (
            <div key={column.key} className={getCellClassName(column.type)}>
              {column.label}
            </div>
          ))}
        </div>

        {/* ROWS */}
        {rows.map((row) => (
          <div
            className="split-times-row split-times-runner"
            key={row.name}
            style={{ gridTemplateColumns }}
          >
            {columns.map((column) => (
              <div key={column.key} className={getCellClassName(column.type)}>
                {renderCell(column, row)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SplitTable;
