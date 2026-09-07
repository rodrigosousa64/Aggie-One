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
            <p>Envie no chat para equipar (use exatamente assim):</p>
            <ul>
              <li><span className="cmd">coloca o chapeu de festa</span> Chapéu Colorido</li>
              <li><span className="cmd">coloca uma gravata elegante</span> Gravata Preta</li>
              <li><span className="cmd">coloca o seu colar</span> Colar Dourado</li>
              <li><span className="cmd">coloca o oculos de sol</span> Óculos Redondos</li>
              <li><span className="cmd">coloca o seu cachecol</span> Cachecol Azul</li>
              <li><span className="cmd">fica sem roupa nenhuma</span> Remove tudo</li>
            </ul>
          </div>

          <div className="manual-section">
            <h2>⭐ Comandos Especiais e História</h2>
            <p>Descubra segredos no chat:</p>
            <ul>
              <li><span className="cmd">vamos fazer uma festa</span> Festa com balões</li>
              <li><span className="cmd">quero entrar na matrix</span> Chuva de código hacker</li>
              <li><span className="cmd">bancar o detetive agora</span> Chapéu Fedora Noir</li>
              <li><span className="cmd">dar um susto nela</span> Dá um baita susto!</li>
              <li><span className="cmd">vem comer um sache</span> Alimenta a gata</li>
              <li><span className="cmd">quem foi que te criou</span> Descubra a origem dela</li>
              <li><span className="cmd">fala da sua dona</span> Lore sobre a Agatha</li>
              <li><span className="cmd">faz risoto pra mim</span> Lore do Risoto</li>
              <li><span className="cmd">estudar direito agora</span> Lore de Direito / Vade Mecum</li>
              <li><span className="cmd">bolo de cenoura com chocolate</span> Lore sobre Doces</li>
              <li><span className="cmd">acorda agatha dorminhoca</span> Lore sobre Sono/Coluna</li>
              <li><span className="cmd">assistir la casa de papel</span> Lore de Séries e Filmes</li>
              <li><span className="cmd">toca tim bernardes</span> Lore de Música / Cantoria</li>
              <li><span className="cmd">voce me ama agatha</span> Mensagem Especial de Amor</li>
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
