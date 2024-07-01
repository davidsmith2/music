#!/bin/bash

# Use the first argument as FILE_PATH
FILE_PATH="$1"

# Extract metadata for title, artist and album using AtomicParsley
metadata1=$(AtomicParsley "$FILE_PATH" -t 1 | grep -E 'Atom "(©nam|©ART|©alb|©gen|©day)" contains: ')

# Parse and format the output
title=$(echo "$metadata1" | grep '©nam' | awk -F": " '{print $2}')
artist=$(echo "$metadata1" | grep '©ART' | awk -F": " '{print $2}')
album=$(echo "$metadata1" | grep '©alb' | awk -F": " '{print $2}')
genre=$(echo "$metadata1" | grep '©gen' | awk -F": " '{print $2}')
year=$(echo "$metadata1" | grep '©day' | awk -F": " '{print $2}')

# Extract metadata for duration using AtomicParsley
metadata2=$(AtomicParsley "$FILE_PATH" -T 1)

# Parse and format the output
duration=$(echo "$metadata2" | awk '/Movie duration:/ {print $3}')

# Format as JSON
echo -e "{
    \"title\": \"$title\",
    \"artist\": \"$artist\",
    \"album\": \"$album\",
    \"genre\": \"$genre\",
    \"year\": \"$year\",
    \"duration\": \"$duration\"
}"