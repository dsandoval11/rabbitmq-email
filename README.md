# Instalación
 Requiere tener instalado el servicio de [RabbitMQ](https://www.rabbitmq.com/download.html) para ejecutarlo.
Copiar el archivo `.env.example` y renombrarlo como `.env`.
Modificar las variables `MAIL_USER` y `MAIL_PASSWORD` con las credenciales de ingreso para poder enviar correos.
> Nota: El proyecto esta configurado para usar solo cuentas de Google (Debe permitir el acceso de apps menos seguras), para cambiar esto se puede modificar el archivo `src/tools/mail`. El listado de servicios que se pueden usar se encuentra en la documentación oficial de [nodemailer](https://nodemailer.com/smtp/well-known/).

Ejecutar consumidor de RabbitMQ
```sh
# Via NPM
$ npx ts-node src/amqp/consumer
# Via Yarn
$ yarn ts-node src/amqp/consumer
```
Instalar dependencias y ejecutar el servidor.
```sh
# Via NPM
$ npm install
$ npx nodemon start
# Via Yarn
$ yarn
$ yarn nodemon start
```