import React from 'react';
import ShowBBB from './ShowBBB';

export default function ListBBBs({ allEditions, allBBBs }) {
  return (
    <div className="flex flex-wrap">
      {allBBBs.map((edition) => {
        return edition.map((participant, i) => {
          return <ShowBBB key={i} participant={participant} />;
        });
      })}
    </div>
  );
}
