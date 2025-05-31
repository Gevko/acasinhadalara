#!/bin/bash

# Loop through all JPG files in public/images directory
for file in public/images/*.jpg; do
    if [ -f "$file" ]; then
        sharp \
            -i "$file" \
            -o "$file" \
            --quality 80 \
            --resize 1200
        echo "Processed: $file"
    fi
done