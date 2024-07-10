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

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          setState({ ...state, error: false, loading: false, confirmed: true });
        } else {
          setState({ ...state, error: true, loading: false });
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

        <button onClick={() => setState({ ...state, loading: true })}>
          Comprobar
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>¿Estás seguro que deseas eliminar el estado?</p>
        <div>
          <button onClick={() => setState({ ...state, deleted: true })}>
            Si, eliminar
          </button>
          <button onClick={() => setState({ ...state, confirmed: false })}>
            Cancelar
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Estado eliminado correctamente</h2>
        <button
          onClick={() =>
            setState({ ...state, confirmed: false, deleted: false })
          }
        >
          Resetear estado
        </button>
      </div>
    );
  }
}

export { UseState };
