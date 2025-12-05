function JugadorPanel({ jugador, username, cartas = [], cartasError }) {
  if (!jugador) {
    return <p className="loading">Cargando datos del jugador...</p>;
  }

  return (
    <div className="player-card">

      <h2 className="player-title">{username}</h2>

      <div className="player-content">

        <div className="player-stats">
          <h3>Atributos</h3>

          <p><strong>Vida:</strong> {jugador.vida}</p>
          <p><strong>Ataque:</strong> {jugador.ataque}</p>
          <p><strong>Defensa:</strong> {jugador.defensa}</p>
          <p><strong>Oro:</strong> {jugador.oro}</p>
          <p><strong>Experiencia:</strong> {jugador.experiencia}</p>
        </div>

        <div className="player-cards">
          <h3>Mis Cartas</h3>
          {cartasError && (
            <p className="error-cards">
              No se pudieron cargar tus cartas. Intenta actualizar.
            </p>
          )}

          {!cartasError && cartas.length === 0 && (
            <p className="no-cards">Aún no tienes cartas.</p>
          )}
          {!cartasError && cartas.length > 0 && (
            <div className="cards-grid">
              {cartas.map((c) => (
                <div key={c.id_carta_jugador} className="card-item">
                  <p>{c.carta.nombre}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default JugadorPanel;


