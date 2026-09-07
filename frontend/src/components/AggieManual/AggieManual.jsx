import React from 'react';
import './AggieManual.css';

export default function AggieManual({ onClose }) {
  return (
    <div className="manual-overlay" onClick={onClose}>
      <div className="manual-book" onClick={(e) => e.stopPropagation()}>
        <button className="manual-close-btn" onClick={onClose}>×</button>
        <div className="manual-content">
          <h1 className="manual-title">Manual da Aggie</h1>
          
          <div className="manual-section">
            <h2>👗 Comandos de Roupas</h2>
            <p>Envie no chat para equipar:</p>
            <ul>
              <li><span className="cmd">quero chapéu</span> Chapéu de Festa Colorido</li>
              <li><span className="cmd">gravata</span> Gravata Borboleta Preta</li>
              <li><span className="cmd">colar</span> Colar Dourado</li>
              <li><span className="cmd">óculos</span> Óculos de Sol Redondos</li>
              <li><span className="cmd">cachecol</span> Cachecol Azul</li>
              <li><span className="cmd">sem roupa</span> Remove todos acessórios</li>
            </ul>
          </div>

          <div className="manual-section">
            <h2>⭐ Comandos Especiais</h2>
            <p>Descubra segredos no chat:</p>
            <ul>
              <li><span className="cmd">aniversário</span> Festa com balões e bolo</li>
              <li><span className="cmd">matrix</span> Chuva de código hacker</li>
              <li><span className="cmd">detetive</span> Coloca chapéu Fedora Noir</li>
              <li><span className="cmd">!</span> Dá um baita susto na gata!</li>
              <li><span className="cmd">comida</span> Alimenta a gata diretamente</li>
            </ul>
          </div>
          
          <div className="manual-section">
            <h2>💡 Dicas de Sobrevivência</h2>
            <p>Como não deixar ela furiosa:</p>
            <ul>
              <li>Mantenha a fome baixa para deixá-la brincalhona.</li>
              <li>SPAM de cliques vai deixá-la muito brava! 😠</li>
              <li>Muito tédio causa Zoomies incontroláveis.</li>
              <li>Música sempre faz ela dançar!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
