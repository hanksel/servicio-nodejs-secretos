const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
	
	 const name = 'projects/test-generales/secrets/secreto-hanksel/versions/latest';

  // Imports the Secret Manager library
  const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

  // Instantiates a client
  const client = new SecretManagerServiceClient();

  async function getSecret() {
	  
    const [version] = await client.getSecretVersion({
      name: name,
    });
	
    const [accessResponse] = await client.accessSecretVersion({
    name: version.name,
  });

  const responsePayload = accessResponse.payload.data.toString('utf8');
  console.info(`Payload: ${responsePayload}`);
	
  }

  getSecret();
  
  
  res.send('Hello World !')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})