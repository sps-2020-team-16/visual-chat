# visual-chat
A chat room with animation figure based on sentimental analysis of chat text.



## Current UI Design

![sign-in](./design-sketch/sign-in.jpg)

![sign-up](./design-sketch/sign-up.jpg)

![chat-box](./design-sketch/chat-box.jpg)

## Configuration Setting

1. Install **MySQL** and **Node.js**

2. Execute this command

   ```bash
   npm install mysql
   ```

3. Log into the MySQL and create the users database as below

   ```bash
   create database visualchat;
   use visualchat;
   create table users ( username varchar(100) NOT NULL, password varchar(100) NOT NULL);
   ```