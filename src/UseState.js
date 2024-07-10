import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  // Estado simple
  const [value, setValue] = React.useState("");

  // Estado compuesto
  const [state, setState] = React.useState({
    error: false,
    loading: false,
  });

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (this.value === SECURITY_CODE) {
          setState({ ...state, error: false });
        } else {
          setState({ ...state, error: true });
        }
        setState({ ...state, loading: false });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

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
}

export { UseState };
