# build discord bot using discord.py library (wrapper for discord API)
# bot itself but in Discord's API world, bot = user/client talking to server
# Client obj -> discord server, event handling
# this file/bot must be running 24/7 for it to be working on the discord channel
import discord
from discord.ext import commands
import os
import logging
import requests
import json
from dotenv import load_dotenv
import yt_dlp


# specifies the bot's purpose
# default from discrod.dev config (messaging for now)
intents = discord.Intents.default()
intents.message_content = True  
handler = logging.FileHandler(filename = 'bot.log', encoding = "utf-8", mode = 'w')
roles = ["Visitor", "Member", "Moderator", "Admin"]
role = "Visitor"


#yt_dlp: downloading youtube videos & audios
options = {
    'format': 'm4a/bestaudio/best',
    'outtmpl': './downloads/%(title)s.%(ext)s',

    # Extract audio from video using ffmpeg
    'postprocessors': [{  
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'm4a',
    }]
}

URL = "https://www.youtube.com/watch?v=aP2WHQKJVsw"

# client/bot activated using token
load_dotenv()
bot = commands.Bot(command_prefix = "$", intents=intents)


# async = run/execute simultaenously w/o stopping main thread
@bot.event
async def on_ready():
    print("Logged in as {0}!".format(bot.user.name))
                                        



# let users download video/audio
# send the downloaded file to user via dm for privacy
# download the file into a folder and then send to user
@bot.command()
async def downloadAudio(ctx):
    with yt_dlp.YoutubeDL(options) as yt:
        await ctx.reply("Downloading...")
        
        # grab the metadata of the video
        info = yt.extract_info(URL, download=True)
        # ensures that the data is clean/removes any non-serialized obj/private var (aka obj x converted to string)
        # takes the output template and applies to the title
        # matches with the title from the download
        title = yt.prepare_filename(info)

        # send via dm for privacy
        await ctx.author.send(file=discord.File(title))
        await ctx.send("Download Completed. Please check your dm for the file")



# decorator python function into a command (functionName = user types)
# @command = other users can type pre-defined calls using symbol ($hello)
#               talking directly to the bot
# @event = built-in calls you can overwrite - on_member_join (when an event happens)
@bot.command()
async def hello(ctx):
    await ctx.send(f'Hi {ctx.author.mention}!')

# any messages sent in the server (if all needs to be responded to)
# event listener
# not NB as bot,commands can both listen to messages
# useful for message filtering, bad words, auto reply, 
#                   logging/writing messages open() f.write
# @bot.event
# async def on_message(message):
#     if message.author.bot:
#         return
#     await bot.process_commands(message) 
# the line above (process_commands) checks for all commands linked to the bot
# if not included, the bot will not respond to any commands
# is the message sent a command or just a normal message to other users?

async def on_member_join(person):
    await person.send(f"Welcome to the Server {person.name}! You can prompt me using the $ symbol")


@bot.command()
async def vote(ctx,*,question):
    # embedded message
    poll = discord.Embed(title = "Vote", description = question)
    pollMessage = await ctx.send(embed = poll)

    await pollMessage.add_reaction("❤️")
    await pollMessage.add_reaction("💔")
    


# function to retrieve a quote
@bot.command()
async def quote(ctx):
    res = requests.get("https://zenquotes.io/api/random")
    data = json.loads(res.text)
    await print(data)


# command to play music from youtube
@bot.command()
async def play(data):
    pass




# assign role to user
# name parameter = name of role defined in the server
# the role needs to exist first in the server.
@bot.command()
async def assign(ctx):
    role = discord.utils.get(ctx.guild.roles, name=roles)

    if role:
        await ctx.author.add_roles(role)
        await ctx.send(f"{ctx.author.mention} Your new title: {roles}")
    else:
        await ctx.send("Role does not exist")
    



@bot.command()
async def remove(ctx):
    role = discord.utils.get(ctx.guild.roles, name=roles)

    if role:
        await ctx.author.remove_roles(role)
        await ctx.send(f"{ctx.author.mention} You lost your title: {roles}")
    else:
        await ctx.send("Role does not exist")


@bot.command()
@commands.has_role(role)
async def secret(ctx):
    await ctx.send("This is a secret message for visitors only")

@secret.error
async def secret_error(ctx, error):
    if isinstance(error, commands.MissingRole):
        await ctx.send("You do not have permission for that!")



#sending dm to user
@bot.command()
async def dm(ctx,*,message):
    await ctx.author.send(message)
    await ctx.send("Check your DMs!")

@bot.command()
async def reply(ctx):
    await ctx.reply("This is a reply")
    
    
    
# start the bot using the token
bot.run(os.getenv("API_KEY"), log_handler=handler, log_level=logging.DEBUG)




