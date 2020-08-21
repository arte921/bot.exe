#!/bin/sh

# Keep executing on return so it can be restarted from Discord without secondary runner scripts shenanigans

while :
    do
        node index.js
done