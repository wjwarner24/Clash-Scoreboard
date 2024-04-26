Hi guys,<br>

I did the whole backend for the project.<br>
It will not work when you try to run it because the API key I use for Clash Royale only works when I am on my home IP address.<br>

I tested it with Postman and all the routes seem to be working, there are probably some bugs somewhere though:<br>

POST /player/:id<br>
  -adds a new player with the given id and adds all their battles<br>
GET /players<br>
  -gets all players<br>
DELETE /players<br>
  -deletes all players<br>
GET /player/:id<br>
  -gets a player<br>
GET /player/:id/clanmates<br>
  -gets the player tags of all the clanmates of a player, only used for testing<br>
PUT /player/:id<br>
  -updates the battles for a player<br>
PUT /player/:id/add-opp/:tag<br>
  -adds the specified opponent to the player's list<br>
PUT /player/:id/remove-opp/:tag<br>
  -removes the specified opponent from the player's list<br>
DELETE /player/:id<br>
  -deletes a given player<br>
GET /player/:id/scores<br>
  -gets the scores for a player against all clanmates and saved opponents<br>

I just need yall to help implement the frontend.<br>

When the user opens the page, there should be a field to enter their player tag<br>
Once they enter it, the page will display their scores,<br>
then the user can manually add more people to compare their scores against<br>

Or the user can change the initial player tag to someone else and see other peoples scores against others<br>


Here are some example player tags of my friends and I:<br>

Me: 2LJ9R9LQ<br>
Eli: 9RGGQQGO<br>
Liam: 2JUYQUCPO<br>
Noah: 802UCY2QQ<br>

We have played eachother a decent amount.<br>

I want to add a script that updates the battles for every player every so often so no battles go unseen.<br>
This is because Clash Royale only displays so many battles in the battle log, so we need to save them before they dissapear.<br>


I have not touched the frontend at all, and I put it an ungodly amount of hours into this on 4/25/2024, so I would really appreciate yall<br>
doing the majority of the frontend. <br>

Thanks,<br>
-William<br>


