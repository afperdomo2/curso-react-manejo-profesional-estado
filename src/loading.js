import React from "react";

class Loading extends React.Component {
  componentDidMount() {
    console.log("✅ Loading -> Mount");
  }
  componentDidUpdate() {
    console.log("🔄️ Loading -> Update");
  }
  componentWillUnmount() {
    console.log("⛔ Loading -> Unmount");
  }

  render() {
    return (
      <p>
        🔄️<b>Cargando...</b>
      </p>
    );
  }
}

export { Loading };
