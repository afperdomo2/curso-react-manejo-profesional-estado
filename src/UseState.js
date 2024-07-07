import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        if (value === SECURITY_CODE) {
          setError(false);
          console.log("✅ Código correcto");
        } else {
          setError(true);
          console.log("🐞 Código incorrecto");
        }
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escribe el código de seguridad</p>

      {error && (
        <p>
          🐞<b>Error:</b> Código de seguridad es incorrecto
        </p>
      )}
      {loading && (
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

      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };
