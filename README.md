**\# Brewery-be**  
  
This document is for getting started with the \`Backend\` environment setup  
  
**\## Get Started**  
  
You can clone repository \[Brewery-be\](https://github.com/rajat-ttn/brewery-be.git)  
  
**\## Prerequisites**  
  
\* Node Js is installed
\* Rabbit MQ is running.
  
**\## Steps to start the server**  
  
  *Set environment variables:-
	  RABBITMQ_URL = 'RABBITMQ_URL_HERE'
	  
\* Install all the dependencies by using \`npm install\`  
\* Start server using \`npm start\`  


**\## Steps to start sensor mock service (it is required to be run, to mock sensor data)**  
\* Run \`npm run start-sensor-service\`
  
**\## Testing**
  
\* Run \`npm test\`

\* Run \`npm run test:coverage\` to see coverage