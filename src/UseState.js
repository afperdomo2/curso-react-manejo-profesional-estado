import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  // Estado compuesto
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
  });

  console.log(state);

  // const [value, setValue] = React.useState("");
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          setState({ ...state, error: false });
        } else {
          setState({ ...state, error: true });
        }
        setState({ ...state, loading: false });
      }, 1000);
    }
  }, [state.loading]);

  // React.useEffect(() => {
  //   if (loading) {
  //     setTimeout(() => {
  //       if (value === SECURITY_CODE) {
  //         setError(false);
  //         console.log("✅ Código correcto");
  //       } else {
  //         setError(true);
  //         console.log("🐞 Código incorrecto");
  //       }
  //       setLoading(false);
  //     }, 1000);
  //   }
  // }, [loading]);

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
        onChange={(e) => setState({ ...state, value: e.target.value })}
      />

      <button onClick={() => setState({ ...state, loading: true })}>
        Comprobar
      </button>
    </div>
  );
}

export { UseState };
