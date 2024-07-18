import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  // Estado simple
  const [value, setValue] = React.useState("");

  // Estado compuesto
  const [state, setState] = React.useState({
    error: false, // estado imperativo para simular error
    loading: false, // estado imperativo para simular carga
    deleted: false, // estado imperativo para simular eliminación
    confirmed: false, // estado imperativo para simular confirmación
  });

  // Estado semi-declarativo
  const onConfirm = () => {
    setState({ ...state, error: false, loading: false, confirmed: true });
  };

  const onError = () => {
    setState({ ...state, error: true, loading: false });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false });
    setValue("");
  };

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {state.error && !state.loading && (
          <p>
            🐞<b>Error:</b> Código de seguridad es incorrecto
          </p>
        )}
        {state.loading && (
          <p>
            🔄️<b>Cargando...</b>
          </p>
        )}

        <input
          type="text"
          placeholder="Código de seguridad"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button onClick={() => onCheck()}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>¿Estás seguro que deseas eliminar el estado?</p>
        <div>
          <button onClick={() => onDelete()}>Si, eliminar</button>
          <button onClick={() => onReset()}>Cancelar</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Estado eliminado correctamente</h2>
        <button onClick={() => onReset()}>Resetear estado</button>
      </div>
    );
  }
}

export { UseState };
