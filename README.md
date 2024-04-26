Hi guys,

I did the whole backend for the project.
It will not work when you try to run it because the API key I use for Clash Royale only works when I am on my home IP address.

I tested it with Postman and all the routes seem to be working, there are probably some bugs somewhere though:

POST /player/:id<br>
  -adds a new player with the given id and adds all their battles
GET /players
  -gets all players
DELETE /players
  -deletes all players
GET /player/:id
  -gets a player
GET /player/:id/clanmates
  -gets the player tags of all the clanmates of a player, only used for testing
PUT /player/:id
  -updates the battles for a player
PUT /player/:id/add-opp/:tag
  -adds the specified opponent to the player's list
PUT /player/:id/remove-opp/:tag
  -removes the specified opponent from the player's list
DELETE /player/:id
  -deletes a given player
GET /player/:id/scores
  -gets the scores for a player against all clanmates and saved opponents

I just need yall to help implement the frontend.

When the user opens the page, there should be a field to enter their player tag
Once they enter it, the page will display their scores,
then the user can manually add more people to compare their scores against

Or the user can change the initial player tag to someone else and see other peoples scores against others


Here are some example player tags of my friends and I:

Me: 2LJ9R9LQ
Eli: 9RGGQQGO
Liam: 2JUYQUCPO
Noah: 802UCY2QQ

We have played eachother a decent amount.

I want to add a script that updates the battles for every player every so often so no battles go unseen.
This is because Clash Royale only displays so many battles in the battle log, so we need to save them before they dissapear.


I have not touched the frontend at all, and I put it an ungodly amount of hours into this on 4/25/2024, so I would really appreciate yall
doing the majority of the frontend. 

Thanks,
-William


