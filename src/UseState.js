import React from "react";

function UseState({ name }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
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

      <input type="text" placeholder="Código de seguridad" />

      <button onClick={() => setLoading(true)}>Comprobar</button>
    </div>
  );
}

export { UseState };
