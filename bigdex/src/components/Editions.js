import React from 'react';

export default function Editions({ editions, handleSelectEditon }) {
  function onSelectEdition(e) {
    let index = e.currentTarget.value;
    handleSelectEditon(index, e.target.checked);
  }

  return (
    <div className="flex flex-wrap place-content-center mt-4 mx-auto">
      <ul className="mx-auto">
        {editions.map(({ id, description, isChecked }) => {
          return (
            <li key={id} className="p-2 inline-block">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-500 align-bottom"
                defaultChecked={isChecked}
                onChange={onSelectEdition}
                value={id - 1}
              ></input>
              <label className="ml-2 text-gray-700 align-top">
                {description}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
