
# Discord Bot

Listening to music and basic commands


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`



## Installation

python 3
dotenv
discord.py (discord API wrapper)
requests (for API calls)

```bash
  python3 -m pip install -U discord.py
  python3 -m pip install requests

  pip3 ./install.sh
```
    
## API Reference
zenquotes.io for grabbing random quotes for the bot.
Quotes are displayed to the users when requested.

```http
  https://zenquotes.io/api

```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `mode` | `string` | **Required**. Retrieval type [quotes, today, author, random] |
| `key` | `string` | API key for use with premium subscriptions|
| `options` | `string` | Additional options. Optional.|


https://zenquotes.io/api/[mode]/[key]?option1=value&option2=value