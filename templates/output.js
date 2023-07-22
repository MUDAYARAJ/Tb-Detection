var estimted = document.getElementById("result");

fetch('http://127.0.0.1:5000/upload, {
  method: 'POST',
  body: formData
})
.then(response => response.text())
.then(data => {
  console.log(data); // Output the returned value to the console
  // Do something with the returned value here
          estimted.innerHTML = "<h2>" + data.out + "</h2>"

})
.catch(error => {
  console.error(error);
});
