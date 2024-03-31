document.addEventListener('DOMContentLoaded', () => {
  
    const videoCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        console.log('Video call initiated:', stream);
      } catch (error) {
        console.error('Error initiating video call:', error);
      }
    };
   

    const voiceCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Voice call initiated:', stream);
      } catch (error) {
        console.error('Error initiating voice call:', error);
      }
    };

    /*const handleSettings = () => {
      console.log('Settings clicked.');
    };*/


    function handleSettingsDropdown() {
      const settingsIcon = document.querySelector('#settings-icon');
      const settingsDropdown = document.querySelector('.settings-menu');
  
      settingsIcon.addEventListener('click', (event) => {
          // Toggle the display of the settings dropdown
          settingsDropdown.style.display = settingsDropdown.style.display === 'none' ? 'block' : 'none';
      });
  
      // Hide the dropdown when clicking outside of it
      document.addEventListener('click', (event) => {
          if (!event.target.closest('#settings-dropdown')) {
              settingsDropdown.style.display = 'none';
          }
      });
  
      
      settingsDropdown.addEventListener('click', (event) => {
          event.stopPropagation();
      });
  }
  
  
  document.addEventListener('DOMContentLoaded', handleSettingsDropdown);
  


  
    const videoCallIcon = document.querySelector('#video-call-icon');
    const voiceCallIcon = document.querySelector('#voice-call-icon');
    const settingsIcon = document.querySelector('#settings-icon');

    videoCallIcon.addEventListener('click', videoCall);
    voiceCallIcon.addEventListener('click', voiceCall);
    settingsIcon.addEventListener('click', handleSettingsDropdown);
  });
  document.addEventListener('DOMContentLoaded', () => {

    const chatboxInput = document.querySelector('.chatbox_input');
    const messageInput = chatboxInput.querySelector('input');
    const sendIcon = chatboxInput.querySelector('ion-icon[name="send-outline"]');
    const emojiIcon = chatboxInput.querySelector('ion-icon[name="happy-outline"]');
    const microphoneIcon = chatboxInput.querySelector('ion-icon[name="mic-outline"]');
  

    sendIcon.addEventListener('click', sendMessage);
    emojiIcon.addEventListener('click', toggleEmojiPicker);
    microphoneIcon.addEventListener('click', voiceMessage);
  
    function sendMessage() {
      const message = messageInput.value.trim();
  
      if (message !== '') {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.classList.add('mymessage');
        newMessage.innerHTML = `<p>${message}<br><span>${getTimeString()}</span></p>`;
  
        const chatbox = document.querySelector('.chatbox');
        chatbox.insertBefore(newMessage, chatbox.lastChild);
        messageInput.value = '';
      }
    }
           
        function  toggleEmojiPicker() {
          const emojiIcon = document.getElementById('emoji-icon');
          const emojiPicker = document.querySelector('.emoji-picker');
          const inputField = document.getElementById('input-field');
          const emojiList = document.querySelector('.emoji-list');
      
          
          const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
      
          
          emojis.forEach(emoji => {
              const span = document.createElement('span');
              span.textContent = emoji;
              emojiList.appendChild(span);
          });
      
          emojiIcon.addEventListener('click', () => {
              emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
          });
      
  
          emojiList.addEventListener('click', (event) => {
              if (event.target.tagName === 'SPAN') {
                  const emoji = event.target.textContent;
                  if (!inputField.value.includes(emoji)) { 
                      inputField.value += emoji;
                  }
                 /* emojiPicker.style.display = 'none';*/
              }
          });
      }
      
      
      document.addEventListener('DOMContentLoaded',  toggleEmojiPicker);
      
    function voiceMessage() {
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
          console.error('MediaRecorder is not supported in this browser.');
          return;
      }
  
      
      navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function(stream) {
              const mediaRecorder = new MediaRecorder(stream);
              const chunks = [];
  
              
              mediaRecorder.start();
  
              mediaRecorder.ondataavailable = function(event) {
                  chunks.push(event.data);
              };
  
              mediaRecorder.onstop = function() {
                  const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
                  const audioURL = URL.createObjectURL(blob);
  
                  
                  const audio = document.createElement('audio');
                  audio.controls = true;
                  audio.src = audioURL;
  
                  
                  const newMessage = document.createElement('div');
                  newMessage.classList.add('message');
                  newMessage.classList.add('mymessage');
  
                  newMessage.appendChild(audio);
                  newMessage.innerHTML += `<br><span>${getTimeString()}</span>`;
  
                  
                  const chatbox = document.querySelector('.chatbox');
                  chatbox.insertBefore(newMessage, chatbox.lastChild);
              };
  
              
              setTimeout(function() {
                  mediaRecorder.stop();
              }, 5000);
          })
          .catch(function(err) {
              console.error('Error accessing microphone:', err);
          });
  }
  
    messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  
    function getTimeString() {
      const now = new Date();
      return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}am`;
    }
  });