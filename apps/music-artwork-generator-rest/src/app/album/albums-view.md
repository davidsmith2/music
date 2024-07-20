db.createView(
  "albumsView",
  "songs",
  [
    {
      $group: {
        _id: "$album",
        songs: {
          $push: {
            _id: { $toString: "$_id" },
            title: "$title",
            genre: "$genre",
            year: "$year",
            duration: "$duration",
            artist: "$artist",
            album: "$album",
            artwork: "$artwork"
          }
        },
        artist: { $first: "$artist" },
        cover: { $first: "$artwork" }
      }
    },
    {
      $project: {
        _id: 1,
        title: "$_id",
        songs: 1,
        artist: 1,
        cover: 1

      }
    }
  ]
);