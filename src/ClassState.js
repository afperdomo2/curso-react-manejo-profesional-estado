import React from "react";

class ClassState extends React.Component {
  state = {
    error: false,
  };

  render() {
    const { name } = this.props;
    const { error } = this.state;

    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {error && (
          <p>
            <b>Error:</b> Código de seguridad es incorrecto
          </p>
        )}

        <input type="text" placeholder="Código de seguridad" />
        <button onClick={() => this.setState({ error: !error })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
