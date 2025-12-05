import { monstruoImgs } from "../utils/monstruoImgs";
import "../assets/styles/monstruopanel.css";
function MonstruoPanel({ monstruo }) {
  if (!monstruo) return null;

  const img = monstruoImgs[monstruo.nombre];

  return (
    <div className="monster-card">
      <div className="monster-header">
        <h3 className="monster-title">Monstruo: {monstruo.nombre}</h3>
        <p className="monster-status">
        </p>
      </div>
      {img && (
        <div className="monster-image-container">
          <img
            src={img}
            alt={monstruo.nombre}
            className="monster-image"
          />
        </div>
      )}

      <div className="monster-stats">
        <p><strong>Vida:</strong> {monstruo.vida}</p>
        <p><strong>Ataque:</strong> {monstruo.ataque}</p>
        <p><strong>Defensa:</strong> {monstruo.defensa}</p>
      </div>
    </div>
  );
}

export default MonstruoPanel;


