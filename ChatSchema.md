# Chat Server-side Schema

## Entity Design

### User

User entity includes:

- user_id: identify a user. (Pk)
- name: shown name.
- password: login password (optional).
- create_time: create time.
- update_time: update time.
- visual_id: linked visual charactor.
- data: map(str->str) containing additional information like last login.

User relationship entity includes:

- user_id: first user_id.
- firend_id: second user_id.
- create_time: create time.
- update_time: update time.
- type: `friend` or `block` or `NULL`

Relationship is one-way, like telegram.

### Chat

Chat entity includes:

- chat_id: identify a chat. (Pk)
- name: chat name that can be searched.
- create_time: create time.
- update_time: update time.
- data: map(str->str) containing additional information like group icon.
- is_p2p: not group chat.

Chat Enrollment entity includes:

- chat_id: (1st of Pk)
- user_id: (2nd of Pk)

### Message

Message entity include:

- msg_id: identify a message. (Pk)
- chat_id: indicate which chat.
- create_time: create time.
- update_time: update time.
- token: generated at client-side.
- msg_type: indicate message type, like 'text' or 'image'.
- msg_content: structured message.
- data: map(str->str) containing additional information like emotion data.

### visual

Visual entity include:

- visual_id: identify a visual. (Pk)
- model_data: basic model data.
- create_time: create time.
- update_time: update time.
- emotion_data: emotion related data (like support an emotion or not).

### change history

Change log entity include:

- change_id: identify a chagne. (Pk)
- type: what changed, like `user`, `relation` or so.
- related_id: Pk of what changed.
- time: when changed.

## Interface Design

Backend provide the following operations:

- Register a user.
- A user searches another user by name.
- A user adds another user as friend / block another user.
- User changes one's visual charactor settings.

- User starts private chat with another user.
- User starts a group chat with other users.
- User joins a group / exit a group.

- User sends message in a chat.
- Emotion server detects emotion and update data.

Backend also actively push following message:

This can be implemented by direct method call or pull the change history.

- Once an entity is created or changed.

## Push service

Push service communicate with client by websocket or long connection.

- Handle user login.
- Handle user operations.
- Push user related message to client.

TBD: Operations like create a group or something should be done through ws or just http request?