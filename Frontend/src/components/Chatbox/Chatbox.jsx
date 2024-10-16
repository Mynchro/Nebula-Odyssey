import { useState, useEffect, useRef } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const chatWindowRef = useRef(null);  // Ref für das Chat-Fenster
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'You' }]);
      setMessage('');
    }
  };

  const generateDummyMessage = () => {
    const dummyMessages = [
      { text: 'Wie geht es dir? loool', sender: 'Oscar' },
      { text: 'Ich bin ein Dummy-Chat. Wie kann ich dir helfen?', sender: 'Bot' },
      { text: 'Was machst du heute?', sender: 'Manuel' },
      { text: 'Hast du schon die neuesten Nachrichten gesehen?', sender: 'Michael' },
      { text: 'Was sind deine Pläne für das Wochenende?', sender: 'Daniel' },
      { text: 'Nebula Odyssey is ja voll geil', sender: 'Fabi' },
      { text: 'Hallo fbw_wd23_d11', sender: 'Dennis' },
      { text: 'Hallo Manuel', sender: 'Alex' },
      { text: 'Hallo Oscar', sender: 'Anna' },
      { text: 'Hallo Coding Bros & Sistas', sender: 'Ralf'},
      { text: 'Ich liebe das Design BANNANA', sender: 'Maik'},
      { text: 'Dann stell ich halt wieder vor...', sender: 'Marius'},
      { text: 'Hi @ all', sender: 'Paul'},
      { text: '237% der Menschen übertreiben völlig!', sender: 'Phillip'},
      { text: 'Hallo!!', sender: 'Klaudia'},
      { text: 'Moin! Natürlich bin ich motiviert, nur halt nicht morgens', sender: 'Kevin'},
      { text: 'Schokolade!!', sender: 'Julijana'},
      { text: 'Moin Moin was geht', sender: 'Jian'}
    ];

    const randomMessage = dummyMessages[Math.floor(Math.random() * dummyMessages.length)];
    return randomMessage;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const dummyMessage = generateDummyMessage();
      setMessages((prevMessages) => [...prevMessages, dummyMessage]);
    }, 10000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setMessages((prevMessages) => [...prevMessages, { text: 'Der Chat ist nun vorbei.', sender: 'Bot' }]);
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat">
      <div className="messages">
        <i className="fa-solid fa-magnifying-glass"></i>
        <i className="fa-regular fa-envelope"></i>
        <i className="fa-regular fa-comment"></i>
        <i className="fa-solid fa-user-gear"></i>
      </div>
      <div className="chat-box">
        <div className="chat-window" ref={chatWindowRef}>
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Schreibe eine Nachricht..."
          />
          <button type="submit" className="submit-button">
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;

