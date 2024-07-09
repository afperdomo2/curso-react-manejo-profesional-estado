import React from "react";
import { Loading } from "./loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  state = {
    value: "",
    error: false,
    loading: false,
  };

  componentDidMount() {
    console.log("✅ ClassState -> Mount");
  }
  componentDidUpdate() {
    console.log("🔄️ ClassState -> Update");
    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.value === SECURITY_CODE) {
          this.setState({ error: false });
        } else {
          this.setState({ error: true });
        }
        this.setState({ loading: false });
      }, 1000);
    }
  }
  componentWillUnmount() {
    console.log("⛔ ClassState -> Unmount");
  }

  render() {
    const { name } = this.props;
    const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {error && !loading && (
          <p>
            🐞<b>Error:</b> Código de seguridad es incorrecto
          </p>
        )}
        {loading && <Loading />}

        <input
          type="text"
          placeholder="Código de seguridad"
          value={value}
          onChange={(e) => this.setState({ value: e.target.value })}
        />

        <button onClick={() => this.setState({ loading: !loading })}>
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
