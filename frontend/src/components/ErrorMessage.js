import '../styles/components/ErrorMessage.css';

export default function ErrorMessage({ message }) {
  return (
    <div className="error-message-container">
      <div className="error-message-box">
        <span role="img" aria-label="error" style={{fontSize: 32, marginRight: 12}}>❌</span>
        <div>
          <h2>Bir hata oluştu</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
