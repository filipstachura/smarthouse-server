#!/bin/bash
DISPLAY=:0 youtube-dl -q -o- $1 | mplayer -fs -framedrop -cache 8192  -
