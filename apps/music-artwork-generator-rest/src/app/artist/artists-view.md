db.createView(
  "artistsView",
  "songs",
  [
    {
      $group: {
        _id: {
          artist: "$artist",
          album: "$album"
        },
        songs: {
          $push: {
            _id: { $toString: "$_id" },
            title: "$title",
            genre: "$genre",
            year: "$year",
            duration: "$duration",
            artist: "$artist",
            album: "$album"
          }
        },
        cover: { $first: "$artwork" }
      }
    },
    {
      $project: {
        _id: 0,
        artist: "$_id.artist",
        album: {
          _id: "$_id.album",
          title: "$_id.album",
          songs: "$songs",
          artist: "$_id.artist",
          cover: "$cover"
        }
      }
    },
    {
      $group: {
        _id: "$artist",
        albums: {
          $push: "$album"
        }
      }
    },
    {
      $project: {
        _id: 1,
        name: "$_id",
        albums: 1
      }
    }
  ]
);