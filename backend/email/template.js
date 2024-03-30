let template = (pa) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultation Request Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      h1 {
        font-size: 24px;
        color: #333;
      }
      p {
        font-size: 16px;
        color: #555;
      }
      ol {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      li {
        margin-bottom: 5px;
      }
    </style>
  </head>
  <body>
    <h1>Consultation Request Notification</h1>
    <p>Doctor,</p>
    <p>You have a pending consultation request from this ${pa} address. Whenever you are free, kindly:</p>
    <ol>
      <li>Go to your dashboard.</li>
      <li>Enter room ID (random 5 characters).</li>
      <li>Once the meeting link is created, send the link to the email address provided in this email.</li>
    </ol>
    <p>Thank you,</p>
    <p>Connect-Health</p>
  </body>
  </html>
  `;
};
module.exports = template;
