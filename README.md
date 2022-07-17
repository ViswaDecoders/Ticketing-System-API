# Ticketing-System-API

- Heroku app: https://ticket--api.herokuapp.com/
- Log file: access.log in current directory
- Video url: https://drive.google.com/file/d/1XWD9zNxdRLsGfxyvMQl8ViGR4S7jtMSw/view?usp=sharing


# To run
- npm install
- And ready to use all api links 

### POST Methods:
- 127.0.0.1:5000/users/new : Body={"username":"nikhil","role":"employee"}
- 127.0.0.1:5000/tickets/new : Body={"title":"Question54","description":"okk"}
- 127.0.0.1:5000/tickets/markAsClosed : Body={"ticketID": 185}
- 127.0.0.1:5000/tickets/delete : Body={"ticketID": 185}

### GET Methods:
- 127.0.0.1:5000/tickets/all
- 127.0.0.1:5000/tickets/?title=value
- 127.0.0.1:5000/tickets/?status=value
