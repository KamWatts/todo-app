import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Pagination } from "@mantine/core";
import { DisplaySettingsContext } from "./DisplaySettingsContext";

function TodoList(props) {
  console.log("Inside TodoList ", props);
  const { items } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const [displaySettings] = useContext(DisplaySettingsContext);
  const { numItemsPerPage } = displaySettings;

  const startIdx = (currentPage - 1) * numItemsPerPage;
  const endIdx = startIdx + numItemsPerPage;
  const displayedItems = items.slice(startIdx, endIdx);

  const totalPages = Math.ceil(items.length / numItemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List>
        {displayedItems.map((item) => (
          <ListItem
            key={item.id}
            style={{ textDecoration: item.completed ? "line-through" : "none" }}
          >
            {item.text}
          </ListItem>
        ))}
      </List>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TodoList;
