import React from "react";

export default function BandListItem({
  name,
  votes,
  id,
  onChange,
  onChangeEnd,
  onVote,
  onDelete,
}) {
  const handleChange = ({ target }) => {
    const updatedValue = target.value;
    onChange && onChange(updatedValue, id);
  };

  const onFocusEnd = () => {
    onChangeEnd && onChangeEnd(id, name);
  };

  const handleVote = () => {
    onVote && onVote(id);
  };

  const handleDelete = () => {
    onDelete && onDelete(id);
  };

  return (
    <tr>
      <td>
        <button className="btn btn-primary" onClick={handleVote}>
          +1
        </button>
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          value={name}
          onBlur={onFocusEnd}
          onChange={handleChange}
        />
      </td>
      <td>
        <h3>{votes}</h3>
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
          Borrar
        </button>
      </td>
    </tr>
  );
}
