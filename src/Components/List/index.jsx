import React, { useContext, useState } from "react";
import { DisplaySettingsContext } from "../../Contex/Settings";
import { Pagination, Box } from "@mantine/core";

function List(props) {
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
    <Box mx="auto" maxWidth={320}>
      <ul style={{ listStyleType: "none" }}>
        {displayedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Box display="flex" justifyContent="center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          size="md"
          withGoToLabel
          variant="outline"
          maxButtons={10}
          limit={displaySettings.numItemsPerPage}
        />
      </Box>
    </Box>
  );
}

export default List;
