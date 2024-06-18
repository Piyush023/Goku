FROM ubuntu:focal

# 1st Command to Update the machine
# 2nd Command to install the curl in the machine
# 3rd Command to setting up the Node.JS - 18 in the machine
# 4th Command to update the machine
# 5th Command to upgrade the machine
# 6th Command to install the Node.JS and Ffmpeg in the machine
RUN /usr/bin/apt-get update && \ 
    /usr/bin/apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    /usr/bin/apt-get update && \
    /usr/bin/apt-get upgrade -y && \
    /usr/bin/apt-get install -y nodejs ffmpeg

# This is to Setting the work directory
WORKDIR /Users/piyushkhurana/Projects/Frontend_Project/videoStreamingWebApp/video_streaming_web_app

# This is to run the Nodemon in the work directory
RUN npm i -g nodemon

CMD nodemon server.js