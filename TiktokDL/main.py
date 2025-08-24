#Download Tiktok videos w/o watermarks
#Tiktok api used from RapidAPI (gateway)
import os

# library for web requests
import requests
# .env file load @ read api_key
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('API_KEY')

video = input("Enter the video url: ").strip()

#api endpoint url
url = "https://tiktok-api23.p.rapidapi.com/api/download/video"
querystring = {"url": video}

headers = {
	"x-rapidapi-key":api_key ,
	"x-rapidapi-host": "tiktok-api23.p.rapidapi.com"
}
try:
	response = requests.get(url, headers=headers, params=querystring)
	if response.status_code == 200:
		print("Video found, downloading...")
		data = response.json()

		if "play" in data:
			videoURL = data["play"]
			videoContent = requests.get(videoURL).content
			with open("download1.mp4", "wb") as f:
				f.write(videoContent)
			print("Video downloaded.")

	elif response.status_code == 404:
		print("Error 404: Video not found")

except Exception as e:
	print("API not responding: ", e)


