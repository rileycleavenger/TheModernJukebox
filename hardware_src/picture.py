import urllib.request
from PIL import Image
import cv2
#import screeninfo
#import pyautogui
import re

#getting image
url = "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" #"https://img2.goodfon.com/wallpaper/nbig/1/e9/cat-kot-koshka-trava-chernyy.jpg"

#get image name
image = re.findall("[^/]+(?=/$|$)", url)[0]

urllib.request.urlretrieve(url, image) #"cat-kot-koshka-trava-chernyy.jpg")

#load image
im = cv2.imread(image) #r"cat-kot-koshka-trava-chernyy.jpg")

# improving resolution of image
hires = cv2.pyrUp(im)
hires2 = cv2.pyrUp(hires)
hires3 = cv2.pyrUp(hires2)

#setting full screen
cv2.namedWindow("Album", cv2.WINDOW_NORMAL)
cv2.setWindowProperty("Album", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

#show image
cv2.imshow("Album", hires3)

#show title bar
#cv2.setWindowTitle("Album", "Call Me Maybe")

cv2.waitKey(0)
cv2.destroyAllWindows()