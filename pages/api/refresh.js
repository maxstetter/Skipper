const SpotifyWebApi = require('spotify-web-api-node');
const URL = 'https://skipp-er.herokuapp.com/'
//const URL = 'http://localhost:3000'

/* 
FUNCTIONALITY:
handles requests at '/login' when users decide to host a session and
thus need to login with their spotify account. 

HOW:
Uses SpotifyWebApi node package to make a request to spotify api at clientID
and Secret bt using the code given from login.
Returns tokens for other spotify api calls.
*/
 

//TODO: remove secret from github repo.
export default function handler(req, res) {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: URL,
        clientId: '8600f707689e46bd9426b2afd625d379',
        clientSecret: 'f30da561b7894a9abc84375defae71eb',
        refreshToken,
    })
    
    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi.refreshAccessToken()
    .then(data => {
        console.log('The access token has been refreshed!');
        //console.log('refreshed: ', data.body);
        res.json({
            // Possible bug here. should be: data.body.accessToken and data.body.expiresIn
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        })

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }).catch(err => {
        console.log('Could not refresh access token', err);
        res.status(400);
    })

}