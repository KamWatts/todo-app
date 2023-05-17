import React, { useContext, useState } from "react";
import { DisplaySettingsContext } from "../../Contex/Settings";
import { Pagination } from "@mantine/core";

function List(props) {
  console.log("Inside the list ", props);
  const { items } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const displaySettings = useContext(DisplaySettingsContext);

  const startIndex = (currentPage - 1) * displaySettings.numItemsPerPage;
  const endIndex = startIndex + displaySettings.numItemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);

  const totalPages = Math.ceil(items.length / displaySettings.numItemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ul>
        {displayedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        size="md"
        withGoToLabel="true"
        variant="outline"
        maxButtons={10}
        limit={displaySettings.numItemsPerPage}
      />
    </>
  );
}

export default List;
