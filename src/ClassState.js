import React from "react";
import { Loading } from "./loading";

class ClassState extends React.Component {
  state = {
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
        console.log("🔄️ ClassState -> Update -> Loading");
        this.setState({ loading: false });
      }, 3000);
    }
  }
  componentWillUnmount() {
    console.log("⛔ ClassState -> Unmount");
  }

  render() {
    const { name } = this.props;
    const { error, loading } = this.state;

    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {error && (
          <p>
            🐞<b>Error:</b> Código de seguridad es incorrecto
          </p>
        )}
        {loading && <Loading />}

        <input type="text" placeholder="Código de seguridad" />

        <button onClick={() => this.setState({ error: !error })}>
          Toggle Error
        </button>
        <button onClick={() => this.setState({ loading: !loading })}>
          Toggle Loading
        </button>
      </div>
    );
  }
}

export { ClassState };
