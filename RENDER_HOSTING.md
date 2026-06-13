# Host Tribute Arcade On Render

Render is the simplest hosted-site option for this prototype because it can run the existing Node server and serve the game page from one public URL.

## What You Need

- A GitHub account.
- A Render account.

## Steps

Fast prep:

```powershell
.\prepare_render_hosting.bat
```

This creates a clean `render_upload` folder and `tribute_arcade_render_upload.zip`, then opens GitHub and Render.

1. Create a new GitHub repository.
2. Upload the files from `render_upload` into that repository.
3. Go to Render and create a new Web Service.
4. Connect the GitHub repository.
5. Set these values:

```text
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

6. Deploy.
7. Open the public Render URL.
8. Click `Host Game`, then copy the invite link from the hosted page.

## Important

- Do not share a `localhost` or `127.0.0.1` link.
- Share only the Render URL, usually something like:

```text
https://tribute-arcade.onrender.com/tribute_four.html
```

- Render free services can sleep after being idle. If the site has been unused for a while, the first load can take about a minute.
- Room state is stored in server memory for this version, so a room can disappear if Render restarts the service. For testing and iteration, this is usually fine.

## Updating The Hosted Game

After changing `tribute_four.html`:

1. Upload/commit the changed file to GitHub.
2. Render will redeploy automatically, or you can press Manual Deploy in Render.
