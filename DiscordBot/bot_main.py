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

    bot = commands.Bot(command_prefix='$')

    
    # async = run/execute simultaenously w/o stopping main thread
    async def on_ready(self):
        print("Logged in as {0}!".format(self.user))



    # decorator python function into a command (functionName = user types)
    # @command = other users can type pre-defined calls using symbol ($hello)
    # @event = built-in calls you can overwrite - on_member_join (when an event happens)
    @bot.command()
    async def hello(ctx):
        await ctx.send(f'Hi {ctx.author.mention}!')


    @bot.command()
    async def vote(ctx,*,question):
        # embedded message
        poll = discord.Embed(title = "Vote", description = question)
        pollMessage = await ctx.send(embed = poll)

        await pollMessage.add_reaction("Good")
        await pollMessage.add_reaction("Bad")
        

    
    # function to retrieve a quote
    @bot.command()
    def get_quote(ctx):
        res = requests.get("https://zenquotes.io/api/random")
        data = json.loads(res.text)
        print(data)


# specifies the bot's purpose
# default from discrod.dev config (messaging for now)
intents = discord.Intents.default()
intents.message_content = True  

# client/bot activated using token
load_dotenv()


client = myClient(command_prefix = "$", intents=intents)
client.run(os.getenv("API_KEY"))




