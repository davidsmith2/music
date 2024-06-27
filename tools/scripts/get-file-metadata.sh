#!/bin/bash

# Use the first argument as FILE_PATH
FILE_PATH="$1"

# Extract metadata using AtomicParsley
metadata=$(AtomicParsley "$FILE_PATH" -t | grep -E 'Atom "(©nam|©ART|©alb)" contains: ')

# Parse and format the output
title=$(echo "$metadata" | grep '©nam' | awk -F": " '{print $2}')
artist=$(echo "$metadata" | grep '©ART' | awk -F": " '{print $2}')
album=$(echo "$metadata" | grep '©alb' | awk -F": " '{print $2}')

# Format as JSON
echo "{\"title\": \"$title\", \"artist\": \"$artist\", \"album\": \"$album\"}"