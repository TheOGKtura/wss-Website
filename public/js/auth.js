function sendPOSTRequest() {
    //console.log("post goes");
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    const data = { 
        email: emailInput, 
        password: passwordInput 
    }; // Create a JavaScript object

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate JSON data
      },
      body: JSON.stringify(data), // Convert the object to a JSON string
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  }

  function resetForm() {
    // server error to HTML
    document.getElementById('password').value = "";
  }