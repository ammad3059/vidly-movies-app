import React from "react";

const ListGroup = (props) => {
  const { items, onItemSelect, selectedItem } = props;
  return (
    <React.Fragment>
      <ul className="list-group">
        {items.map((gen) => {
          return (
            <li
              style={{ cursor: "pointer" }}
              key={gen}
              className={
                selectedItem === gen
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => {
                onItemSelect(gen);
              }}
            >
              {gen}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default ListGroup;
