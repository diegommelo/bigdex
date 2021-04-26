import React from 'react';
import ShowBBB from './ShowBBB';

export default function ListBBBs({ filterByType, scrollToTop, allBBBs }) {
  function filterBBBbyType(e) {
    filterByType(e);
  }

  return (
    <div className="md:w-9/12 flex flex-wrap place-content-center mt-4 mx-auto">
      {allBBBs.map((edition) => {
        return edition.map((participant, i) => {
          return (
            <ShowBBB
              key={i}
              participant={participant}
              handleFilterByType={filterBBBbyType}
            />
          );
        });
      })}
    </div>
  );
}
