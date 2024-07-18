import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  // Función que devuelve un objeto con diferentes acciones para modificar el estado.
  const reducerObject = (state, payload) => ({
    error: { ...state, error: true, loading: false },
    check: { ...state, loading: true },
    confirm: { ...state, error: false, loading: false, confirmed: true },
    delete: { ...state, deleted: true },
    reset: { ...state, confirmed: false, deleted: false, value: "" },
    write: { ...state, value: payload },
  });

  // Función reductora que actualiza el estado de la aplicación en función de la acción recibida.
  const reducer = (state, action) => {
    return reducerObject(state, action.payload)?.[action.type] ?? state;
  };

  const initialState = {
    value: "",
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          dispatch({ type: "confirm" });
        } else {
          dispatch({ type: "error" });
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
          value={state.value}
          onChange={(e) => dispatch({ type: "write", payload: e.target.value })}
        />

        <button onClick={() => dispatch({ type: "check" })}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>¿Estás seguro que deseas eliminar el estado?</p>
        <div>
          <button onClick={() => dispatch({ type: "delete" })}>
            Si, eliminar
          </button>
          <button onClick={() => dispatch({ type: "reset" })}>Cancelar</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Estado eliminado correctamente</h2>
        <button onClick={() => dispatch({ type: "reset" })}>
          Resetear estado
        </button>
      </div>
    );
  }
}

export { UseReducer };
