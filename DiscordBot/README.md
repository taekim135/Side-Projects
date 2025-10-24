
# Discord Bot
Discord bot for downloading, streaming youtube videos and getting random quotes. 
Simply invite the bot to your server and use the commands.

#### Features:
- Download youtube videos (in audio format) and get them sent to your DMs
- Stream youtube videos (in audio format) in your voice channel
- Get random inspirational quotes

#### Features to be worked on/under development:
- Download youtube videos (in audio format) and get them sent to your DMs
- Stream youtube videos (in audio format) in your voice channel
- Get random inspirational quotes

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

`API_KEY`


## Installation

python 3
dotenv
discord.py (discord API wrapper)
requests (for API calls)
yt_dlp (youtube downloader)

```bash
  python3 -m pip install -U discord.py
  python3 -m pip install requests
  pip3 ./install.sh
```

## Running the program
1. 
'''terminal
  python3 bot_main.py
'''

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
