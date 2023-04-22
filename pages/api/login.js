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
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: URL,
        //redirectUri: 'http://localhost:3000',
        clientId: '8600f707689e46bd9426b2afd625d379',
        clientSecret: 'f30da561b7894a9abc84375defae71eb',
    })
    return new Promise((resolve, reject) => {
        spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
            resolve();
        }).catch(err => {
            //console.log('Error: ', err);
            res.status(400);
            resolve();
        })
    })
}