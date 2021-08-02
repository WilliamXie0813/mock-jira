import React, { ChangeEvent, useState, useEffect } from "react";

export const SearchPanel: React.VFC = ({ users, param, setParam }: any) => {
  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setParam({ ...param, name: e.target.value });
  }

  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setParam({ ...param, personId: e.target.value });
  }

  return (
    <form>
      <input type="text" value={param.name} onChange={onInputChange} />
      <select value={param.personId} onChange={onSelectChange}>
        <option value="">负责人</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
};
