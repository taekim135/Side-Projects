# build discord bot using discord.py library (wrapper for discord API)
# Client obj -> discord server, event handling
# this file/bot must be running 24/7 for it to be working on discord channel
import discord
from discord.ext import commands
import os
import requests
import json
from dotenv import load_dotenv


# interacts with Discord API
# extended from discord.Client
# bot itself but in Discord's API world, bot = user/client talking to server
class myClient(discord.Client):

    bot = commands.Bot(command_prefix='!')

    
    # async = run/execute simultaenously w/o stopping main thread
    async def on_ready(self):
        print("Logged in as {0}!".format(self.user))


    # tells discord.py that it's a command
    # decorator pytho function into a command
    @bot.command(name='hello')
    async def greet(ctx):
        await ctx.send(f'Hi {ctx.author.name}!')

    
    # function to retrieve a quote
    def get_quote():
        res = requests.get("https://zenquotes.io/api/random")
        data = json.loads(res.text)


# specifies the bot's purpose
# default from discrod.dev config (messaging for now)
intents = discord.Intents.default()
intents.message_content = True  

# client/bot activated using token
load_dotenv()


client = myClient(command_prefix = "$", intents=intents)
client.run(os.getenv("API_KEY"))




