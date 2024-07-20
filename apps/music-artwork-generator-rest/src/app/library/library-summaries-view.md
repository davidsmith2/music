db.createView(
  "librarySummariesView",
  "libraries",
  [
    {
      $lookup: {
        from: "songs",
        localField: "songs",
        foreignField: "_id",
        as: "songDetails"
      }
    },
    {
      $addFields: {
        songDetails: {
          $map: {
            input: "$songDetails",
            as: "detail",
            in: {
              $mergeObjects: [
                "$$detail",
                { username: "$username" }
              ]
            }
          }
        }
      }
    },
    {
      $unwind: "$songDetails"
    },
    {
      $facet: {
        "UserDetails": [
          {
            $project: {
              username: "$songDetails.username"
            }
          }
        ],
        "TotalSongs": [
          { $count: "count" }
        ],
        "TotalAlbums": [
          { $group: { _id: "$songDetails.album" } },
          { $count: "count" }
        ],
        "TotalArtists": [
          { $group: { _id: "$songDetails.artist" } },
          { $count: "count" }
        ]
      }
    },
    {
      $project: {
        _id: 0,
        username: { $arrayElemAt: ["$UserDetails.username", 0] },
        songs: { $arrayElemAt: ["$TotalSongs.count", 0] },
        albums: { $arrayElemAt: ["$TotalAlbums.count", 0] },
        artists: { $arrayElemAt: ["$TotalArtists.count", 0] }
      }
    }
  ]
)