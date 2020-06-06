# hackathon
if npm install give any issues then run  npm cache clean --force
then run npm install

then npm run-script start

Change the ports in spring boot microservice, if you choose to change the react port.

Run spring boot app with mvn spring-boot:run goal

If you are changing the spring boot port then change the same in react app.


Command to explicitly list and kill the port,if you face issue :

netstat -ao | find "8086" - list pid 

Taskkill /PID  20712 /F - kill the above process id
