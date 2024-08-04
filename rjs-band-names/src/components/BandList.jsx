import React, { useContext, useEffect, useState } from "react";
import { IOEvent } from "../config";
import { SocketContext } from "../context";
import BandListItem from "./BandListItem";

const BandList = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on(IOEvent.bands, (values) => {
      setBands(values);
    });
    return () => socket.off(IOEvent.bands);
  }, [socket]);

  const votarBanda = (id) => {
    socket.emit(IOEvent.vote, id);
  };

  const eliminarBanda = (id) => {
    socket.emit(IOEvent.delete, id);
  };
  const actualizarBanda = (id, name) => {
    socket.emit(IOEvent.update, { id, name });
  };

  const onNameChange = (name, id) => {
    console.table([{ name, id }]);

    setBands((state) =>
      state.map((band) => {
        if (band.id === id) {
          band.name = name;
        }
        return band;
      })
    );
  };

  return (
    <>
      <h3>Lista de Bandas</h3>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {bands.map((band) => (
            <BandListItem
              key={band.id}
              id={band.id}
              name={band.name}
              votes={band.votes}
              onChange={onNameChange}
              onChangeEnd={actualizarBanda}
              onDelete={eliminarBanda}
              onVote={votarBanda}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BandList;
