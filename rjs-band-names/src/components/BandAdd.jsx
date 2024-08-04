import React, { useContext, useState } from "react";
import { IOEvent } from "../config";
import { SocketContext } from "../context";

const BandAdd = () => {
  const { socket } = useContext(SocketContext);
  const [form, setForm] = useState({ band: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.band.length < 3) return;

    socket.emit(IOEvent.add, form.band);

    setForm({ band: "" });
  };

  const onChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Crear banda"
          name="band"
          value={form.band}
          onChange={onChange}
        />
      </form>
    </>
  );
};

export default BandAdd;
