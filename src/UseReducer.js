import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  // Definición de las acciones que se pueden realizar sobre el estado.
  const actionType = {
    ERROR: "error",
    CHECK: "check",
    CONFIRM: "confirm",
    DELETE: "delete",
    RESET: "reset",
    WRITE: "write",
  };

  // Función que devuelve un objeto con diferentes acciones para modificar el estado.
  const reducerObject = (state, payload) => ({
    [actionType.ERROR]: { ...state, error: true, loading: false },
    [actionType.CHECK]: { ...state, loading: true },
    [actionType.CONFIRM]: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionType.DELETE]: { ...state, deleted: true },
    [actionType.RESET]: {
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    },
    [actionType.WRITE]: { ...state, value: payload },
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

  // Actions creators
  const onConfirm = () => dispatch({ type: actionType.CONFIRM });
  const onError = () => dispatch({ type: actionType.ERROR });
  const onCheck = () => dispatch({ type: actionType.CHECK });
  const onDelete = () => dispatch({ type: actionType.DELETE });
  const onReset = () => dispatch({ type: actionType.RESET });

  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionType.WRITE, payload: value });
  };

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
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
          value={state.value}
          onChange={onWrite}
        />

        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>¿Estás seguro que deseas eliminar el estado?</p>
        <div>
          <button onClick={onDelete}>Si, eliminar</button>
          <button onClick={onReset}>Cancelar</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Estado eliminado correctamente</h2>
        <button onClick={onReset}>Resetear estado</button>
      </div>
    );
  }
}

export { UseReducer };
