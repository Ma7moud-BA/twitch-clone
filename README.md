# ngrok (exposing the localhost to the internet)

In development the localhost is not exposed to the internet so we need to expose it to connect it to other services using webhooks
in production this will not be a problem but in development it is,
using ngrok is a way of solving this problem

download ngrok then add the path of the file you installed to the environment variables path, sign up for a free account then add your auth to the config file by running the cli` ngrok config add-authtoken TOKEN [flags]`
then in vscode CLI run `ngrok http 3000`

to get a free static domain in the ngrok website go to `Cloud Edge -> Domains `create a new domain then you will get a cli copy it and paste it in vs CLI but change the port to 3000
` ngrok http --domain=manually-growing-quail.ngrok-free.app 3000`

after these steps the localhost will be exposed to the internet thorough the static domain generated by ngrok, you can find this domain in the `forwarding` label in the cli

so now in development run `npm run dev ` then `ngrok http 3000`

# Clerk Webhook

Clerk webhooks allow you to receive event notifications from Clerk. Clerk will send a POST request to a URL you specify when certain events happen in your Clerk account.

https://clerk.com/docs/users/sync-data

in clerk dashboard go to webhooks, add Endpoint then paste the static domain provided by ngrok`https://manually-growing-quail.ngrok-free.app`then add `/api/webhook/clerk` so `https://manually-growing-quail.ngrok-free.app/api/webhook/clerk`

Then in the message filtering select User created ,deleted , updated events , click create then you will get a signing secret, store this secret in the .env file

Instal svix `npm install svix`
Svix provides a package for verifying the webhook signature, making it easy to verify the authenticity of the webhook events.
Then build the webhook, use the documentation.

add "/api/webhooks/(.\*)" to the public routes in the middleware file

fire a testing event from clerk to test the webhook

modify the webhook to create,update,delete a user model in the db every time an event is done by clerk

# QueryString

A Library used to generate a url with a query string in the search component

# Zustand

a state-management library, used to create the store which will take care whether the wrapper component in the sidebar is collapsed or not

# usehooks-ts

useMediaQuery is used to know whether we reached the lg breakpoint in the container component that wraps the homepage, to make changes when reaching it
it returns a boolean when matching a query provided to it

# Sonner

Sonner is an opinionated toast component for Reac

# LiveKit

i used liveKit to create an RTMP "Real-Time messaging protocol" protocol connection
https://docs.livekit.io/egress-ingress/ingress/overview/#whip-/-rtmp
https://docs.livekit.io/realtime/quickstarts/nextjs-13/
https://livekit.io
a real time video and audio for developers , its an open source
sign in then create the app, prepare the environment variables, from the dashboard go to settings->keys, add a new key called development this will give some keys, store the api key, secret key and the websocket url key in the .env file, then go to analytics to find the api_url and add https:// to it then store it as well.

## packages for livekit

### @livekit/components-react

gives some client hooks and components

### livekit-client

### livekit-server-sdk

#### making a livekit webhook

go to livekit dashboard -> settings->webhooks-> add new endpoint

name it anything, the URL is the one from ngrok, but add to it /api/webhooks/livekit. " https://manually-growing-quail.ngrok-free.app/api/webhooks/livekit"
for the signing api key choose the one created at the first step when establishing the livekit connection it should match the one in the .env file

# jwt-decode

to generate a token for the viewer that watches the stream, used in hooks/use-viewer-token

# upload-thing

https://docs.uploadthing.com/getting-started/appdir
used to upload the thumbnail img for the stream,
after following the documentation and setting up the files
api/uploadthing.ts,lib/uploadthing.ts, info-card.ts

add"/api/uploadthing" to the middleware in the publicRoutes

todo: add covenant to that the user can join

after deployment, we don't need the use of ngrok anymore so we add a new endpoint in the livekit webhook from the livekit dashboard->setting->webhooks
and put the one from vercel followed by /api/webhooks/livekit
and the same thing goes for clerk webhook, edit the endpoint to take the new url from vercel.
