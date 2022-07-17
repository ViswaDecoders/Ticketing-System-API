# Ticketing-System-API (Nodejs + express + MongoDB)

- Heroku link: https://ticket--api.herokuapp.com/
- Log file: https://drive.google.com/file/d/16v6o5POaHRnCboLJvONovAM5uNjN693e/view?usp=sharing
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

Similarly, in Heroku
### POST Methods:
- https://ticket--api.herokuapp.com/users/new : Body={"username":"nikhil","role":"employee"}
- https://ticket--api.herokuapp.com/tickets/new : Body={"title":"Question54","description":"okk"}
- https://ticket--api.herokuapp.com/tickets/markAsClosed : Body={"ticketID": 185}
- https://ticket--api.herokuapp.com/tickets/delete : Body={"ticketID": 185}

### GET Methods:
- https://ticket--api.herokuapp.com/tickets/all
- https://ticket--api.herokuapp.com/tickets/?title=value
- https://ticket--api.herokuapp.com/tickets/?status=value
