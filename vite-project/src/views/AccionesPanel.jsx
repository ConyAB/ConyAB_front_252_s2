function AccionesPanel({
  onAtaqueBasico,
  onAtaqueEspecial,
  onMostrarCartas,
  onAbrirTienda
}) {
  return (
    <div className="acciones">
      <h2>Acciones</h2>

      <button onClick={onAtaqueBasico}>Ataque Básico</button>

      {onAtaqueEspecial && (
        <button onClick={onAtaqueEspecial}>Ataque Especial</button>
      )}

      {onMostrarCartas && (
        <button onClick={onMostrarCartas}>Mis Cartas</button>
      )}

      {onAbrirTienda && (
        <button onClick={onAbrirTienda}>Tienda</button>
      )}
    </div>
  );
}

export default AccionesPanel;

