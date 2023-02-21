const SpotifyWebApi = require('spotify-web-api-node');

export default function handler(req, res) {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '8600f707689e46bd9426b2afd625d379',
        clientSecret: 'f30da561b7894a9abc84375defae71eb',
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(() => {
        res.status(400);
    })
}