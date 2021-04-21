import React from 'react';
import ShowBBB from './ShowBBB';

export default function ListBBBs({ allEditions, allBBBs }) {
  return (
    <div className="flex flex-wrap">
      {/*       <div>
        <ul>
          {allEditions.map(({ id, description }) => {
            return <li>{description}</li>;
          })}
        </ul>
      </div> */}
      {allBBBs.map((edition) => {
        return edition.map((participant) => {
          return <ShowBBB participant={participant} />;
        });
      })}
    </div>
  );
}
